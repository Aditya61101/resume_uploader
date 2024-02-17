from rest_framework import serializers
from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    location = serializers.ListField(child=serializers.CharField(), allow_empty=True, required=False)
    print("on line 6: ",location)
    class Meta:
        model=Profile
        fields='__all__'

    def create(self, validated_data):
        locations = validated_data.pop('location', None)
        print("on line 13: ",locations)
        instance = super().create(validated_data)
        if locations:
            instance.location = ','.join(locations)
            print("on line 17: ",instance.location)
            instance.save()
        return instance
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['location'] = instance.get_location()
        return data