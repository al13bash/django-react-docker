from django.core import serializers

class TodoSerializer(serializers.Serializer):
  text = serializers.CharField(max_length=30)