from rest_framework import serializers
from .models import Client
from tags.models import Tag
from tags.serializers import TagSerializer

class ClientSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)  
    tag_ids = serializers.ListField(
        write_only=True,
        child=serializers.IntegerField(),
        required=False
    ) 

    class Meta:
        model = Client
        fields = ['id', 'name', 'email', 'number', 'status', 'tags', 'tag_ids']

    def create(self, validated_data):
        tag_ids = validated_data.pop('tag_ids', [])  

        tags = Tag.objects.filter(id__in=tag_ids)

        if len(tags) != len(tag_ids):
            raise serializers.ValidationError({"tag_ids": "One or more of the provided tags does not exist."})

        client = Client.objects.create(**validated_data)
        client.tags.set(tags)  
        return client

    def update(self, instance, validated_data):
        tag_ids = validated_data.pop('tag_ids', None)  

        instance.name = validated_data.get('name', instance.name)
        instance.email = validated_data.get('email', instance.email)
        instance.number = validated_data.get('number', instance.number)
        instance.status = validated_data.get('status', instance.status)
        instance.save()

        if tag_ids is not None:
            tags = Tag.objects.filter(id__in=tag_ids)

            if len(tags) != len(tag_ids):
                raise serializers.ValidationError({"tag_ids": "One or more of the provided tags does not exist."})

            instance.tags.set(tags)

        return instance