from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Client
from .serializers import ClientSerializer
from django.db.models import Q
from rest_framework.pagination import PageNumberPagination

@api_view(['POST', 'GET'])
def client_list(request):

    # Create Client
    if request.method == 'POST':
        serializer = ClientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # Get Clients w/ Pagination
    elif request.method == 'GET':
        search = request.GET.get('search', '')
        order = request.GET.get('order', 'newest')
        page_size = int(request.GET.get('pageSize', 5)) 
        page = int(request.GET.get('page', 1))  

        clients = Client.objects.filter(Q(name__icontains=search))

        if order == 'asc':  # A-Z
            clients = clients.order_by('name')
        elif order == 'desc':  # Z-A
            clients = clients.order_by('-name')
        elif order == 'newest':  # Mais novos primeiro
            clients = clients.order_by('-createdAt')
        elif order == 'oldest':  # Mais antigos primeiro
            clients = clients.order_by('createdAt')
 

        paginator = PageNumberPagination()
        paginator.page_size = page_size
        paginator.page = page  

        paginated_clients = paginator.paginate_queryset(clients, request)

        serializer = ClientSerializer(paginated_clients, many=True)
        
        return paginator.get_paginated_response(serializer.data)

@api_view(['GET', 'PUT', 'DELETE'])
def client_detail(request, pk):
    try:
        client = Client.objects.get(pk=pk)
    except Client.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ClientSerializer(client)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ClientSerializer(client, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        client.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

