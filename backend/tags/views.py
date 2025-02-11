from django.shortcuts import render
from rest_framework.decorators import api_view
from .serializers import TagSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import Tag

@api_view(['GET', 'POST'])
def tag_list(request):

    # Create Tag
    if request.method == 'POST':
        serializer = TagSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # Get All Tags
    if request.method == 'GET':
        tags = Tag.objects.all()
        serializer = TagSerializer(tags, many=True)
        return Response(serializer.data)
    

    
@api_view(['DELETE'])
def tag_detail(request, pk):
    try:
        tag = Tag.objects.get(pk=pk)
    except Tag.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'DELETE':
        tag.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)