from base.serializers import UserSerilalizer, UserSerilalizerWithToken
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerilalizerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v

        return data
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def registerUser(request):
    data = request.data

    try:
        user = User.objects.create(
            first_name = data['name'],
            username = data['email'],
            email = data['email'],
            password = make_password(data['password'])
        )
        serializer = UserSerilalizerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this eamil already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serilalizer = UserSerilalizerWithToken(user, many=False)
    data = request.data 

    user.first_name = data['name']
    user.username = data['email']
   
    # print('PRINT KORLAM ', user)
    if data['password'] != '':
        user.password = make_password(data['password'])
    user.save()
    return Response(serilalizer.data)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serilalizer = UserSerilalizer(user, many=False)
    return Response(serilalizer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    user = User.objects.all()
    serilalizer = UserSerilalizer(user, many=True)
    return Response(serilalizer.data)