from django.contrib.auth.models import User
from django.db import models


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    current_team = models.JSONField(default=list, blank=True)

    def add_pokemon(self, pokemon_id):
        if self.current_team is None:
            self.current_team = []

        if pokemon_id not in self.current_team:
            self.current_team.append(pokemon_id)
            self.save()

    def remove_pokemon(self, pokemon_id):
        if self.current_team is None:
            self.current_team = []
            return

        if pokemon_id in self.current_team:
            self.current_team.remove(pokemon_id)
            self.save()

    def __str__(self):
        return self.user.username
