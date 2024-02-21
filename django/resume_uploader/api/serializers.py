from rest_framework import serializers
from .models import Profile
from cloudinary.uploader import upload

class ProfileSerializer(serializers.ModelSerializer):
    location = serializers.ListField(child=serializers.CharField(), allow_empty=True, required=False)
    class Meta:
        model=Profile
        fields='__all__'

    def create(self, validated_data):
        image = self.context['request'].data.get('image')
        resume = self.context['request'].data.get('resume')

        image_cloudinary_response = upload(image)
        validated_data['image_cloudinary_url'] = image_cloudinary_response['url']

        resume_cloudinary_response = upload(resume)
        validated_data['resume_cloudinary_url'] = resume_cloudinary_response['url']
        
        locations = validated_data.pop('location', None)
        instance = super().create(validated_data)
        if locations:
            instance.location = ','.join(locations)
            instance.save()
        return instance
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['location'] = instance.get_location()
        return data