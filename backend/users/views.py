from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from users.models import UserProfile
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken


class RegisterUser(APIView):
    def post(self, request):
        print(f"\n=== Register User Request ===")
        print(
            f"Attempting to register new user with username: {request.data.get('username')}"
        )

        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")

        # Validate input data
        if not all([username, email, password]):
            print("Registration failed: Missing required fields")
            return Response(
                {"error": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Check existing username
            if User.objects.filter(username=username).exists():
                print(f"Registration failed: Username '{username}' already exists")
                return Response(
                    {"error": "Username already exists"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Check existing email
            if User.objects.filter(email=email).exists():
                print(f"Registration failed: Email '{email}' already exists")
                return Response(
                    {"error": "Email already exists"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Create user
            user = User.objects.create_user(
                username=username, email=email, password=password
            )

            # Create user profile
            UserProfile.objects.create(user=user)
            print(f"Successfully created user and profile for {username}")

            # Generate tokens
            refresh = RefreshToken.for_user(user)
            print(f"Generated authentication tokens for {username}")

            return Response(
                {
                    "message": "Registration successful",
                    "access": str(refresh.access_token),
                    "refresh": str(refresh),
                },
                status=status.HTTP_201_CREATED,
            )

        except Exception as e:
            print(f"Unexpected error during registration: {str(e)}")
            return Response(
                {"error": "Registration failed due to server error"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class LoginView(APIView):
    def post(self, request):
        print("\n=== Login Request ===")
        print("Attempting user login")

        username = request.data.get("username")
        password = request.data.get("password")

        if not all([username, password]):
            print("Login failed: Missing credentials")
            return Response(
                {"error": "Both username and password are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            user = authenticate(username=username, password=password)

            if user is not None:
                print(f"Successfully authenticated user: {username}")
                refresh = RefreshToken.for_user(user)
                return Response(
                    {
                        "message": "Login successful",
                        "access": str(refresh.access_token),
                        "refresh": str(refresh),
                    }
                )
            else:
                print(f"Failed login attempt for username: {username}")
                return Response(
                    {"error": "Invalid credentials"},
                    status=status.HTTP_401_UNAUTHORIZED,
                )

        except Exception as e:
            print(f"Unexpected error during login: {str(e)}")
            return Response(
                {"error": "Login failed due to server error"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST
            )


class GetUserTeam(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        print("\n=== Get User Team Request ===")
        print(f"Fetching team for user: {request.user.username}")

        try:
            # Get or create the user profile
            user_profile, created = UserProfile.objects.get_or_create(
                user=request.user,
                defaults={"current_team": []},  # Provide default empty list
            )

            if created:
                print(f"Created new profile for user: {request.user.username}")

            # Ensure current_team is always a list
            if user_profile.current_team is None:
                user_profile.current_team = []
                user_profile.save()

            print(f"Current team: {user_profile.current_team}")
            return Response(
                {
                    "message": "Team retrieved successfully",
                    "current_team": user_profile.current_team,
                },
                status=status.HTTP_200_OK,
            )

        except Exception as e:
            print(f"Error fetching team: {str(e)}")
            return Response(
                {"error": "Failed to fetch team"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class UpdateUserTeam(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        print(f"\n=== Update Team Request ===")
        print(f"User: {request.user.username}")
        print(f"Request Data: {request.data}")
        print(f"Request Headers: {request.headers}")

        try:
            user_profile, created = UserProfile.objects.get_or_create(user=request.user)
            if created:
                print(f"Created new UserProfile for user: {request.user.username}")

            pokemon_id = request.data.get("pokemon_id")
            action = request.data.get("action")

            print(f"Action: {action}")
            print(f"Pokemon ID: {pokemon_id}")
            print(f"Current team before update: {user_profile.current_team}")

            if not pokemon_id:
                print("Error: Missing pokemon_id")
                return Response(
                    {"error": "pokemon_id is required"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if action == "catch":
                # Remove team size limit for authenticated users
                user_profile.add_pokemon(pokemon_id)
                print(f"Added Pokemon {pokemon_id} to team")
                print(f"Updated team: {user_profile.current_team}")
                return Response(
                    {
                        "message": "Pokémon added successfully!",
                        "current_team": user_profile.current_team,
                    }
                )

            elif action == "release":
                user_profile.remove_pokemon(pokemon_id)
                print(f"Released Pokemon {pokemon_id} from team")
                print(f"Updated team: {user_profile.current_team}")
                return Response(
                    {
                        "message": "Pokémon released successfully!",
                        "current_team": user_profile.current_team,
                    }
                )

            else:
                print(f"Error: Invalid action '{action}'")
                return Response(
                    {"error": f"Invalid action: {action}. Use 'catch' or 'release'"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        except Exception as e:
            print(f"Error updating team: {str(e)}")
            print(f"Full error details: ", e)
            return Response(
                {"error": f"Failed to update team: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
