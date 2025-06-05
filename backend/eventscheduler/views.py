
from django.contrib.auth import authenticate, login
from rest_framework.decorators import api_view
from rest_framework import status
from django.middleware.csrf import get_token
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.exceptions import ValidationError
from django.views.decorators.csrf import csrf_protect,ensure_csrf_cookie
from django.utils.decorators import method_decorator
from . models import * 

csrf=method_decorator(csrf_protect)
ensure_csrf = method_decorator(ensure_csrf_cookie)  


# Create your views here.

def valid(password1,password2):
        print("does it reach here in Validate")
        error_messages = {
        "password_mismatch": ("The two password fields didn’t match."),
             }
        if password1 and password2 and password2!=password1:
            raise ValidationError(error_messages["password_mismatch"],code="password_mismatch")
        return password2

def savet(data):
        stat=False
        print("reach here in register")
        password1=valid(data['password1'],data['password2'])
        usrse = User(first_name=data['first_name'],last_name=data['last_name'],username=data['email'],email=data['email'])
        usrse.set_password(password1)    
        usrse.save()
        print(usrse)
        user=Usr(phone=data['phone'],user=usrse)
        user.save()
        print(user)
        return "saved successfuly"



@api_view(['post'])
def createEvent(request,usr):
    print("rech here")
    usr = User.objects.filter(id=usr).first()
    usrrl = Usr.objects.filter(user=usr).first()
    response = request.data
    print(response)
    print(response['notes'])
    event = EventScheduler(scheduleOn=response['scheduleon'],notes=response['notes'],repeatation=response['repeatation'],usr=usrrl)
    event.save()
    return Response('event saved successfuly', status=status.HTTP_200_OK)

@api_view(['post'])
def createAccount(request):
    
    response = request.data
    print(response)
    user = savet(response)
    
    return Response(user, status=status.HTTP_200_OK)

@ensure_csrf 
@api_view(['get'])
def setCsrf(request):
    print("first in get csrf")
    get_token(request)
    print(request)
    print(request.data)
    return Response(request.data) 

class loginUsr(APIView):

    def get(self,request):
        print(request.session)
        user = request.user
        usr = Usr.objects.filter(user=user).first()
        return Response(usr)

    
    def post(self,request):
        response = request.data
        user = authenticate(request,username=response['email'],password=response['password'])
        print(user)
        login(request,user)
        print(str(user))

        usr = User.objects.filter(username=str(user)).first()
        print(usr.id)
        
        if user:
            return Response(usr.id,status=status.HTTP_200_OK)
        else:
            return Response("Failed to login",status=status.HTTP_400_BAD_REQUEST)


@api_view(['get','post'])
def editEvent(request,usr):
    usr = User.objects.filter(id=usr).first()
    usrrl = Usr.objects.filter(user=usr).first()
    event = EventScheduler.objects.filter(usr=usrrl).first()
    data = request.data
    if data['scheduleon']!=None:
        event.scheduleOn=data['scheduleon']
    if data['notes']!=None:
        event.notes=data['notes']
    if data['repeatation']!=None:
        event.repeatation=data['repeatation']    
    if data['phone']!=None:
        event.phone=data['phone']
    event.save()
    return Response('event edited successfuly', status=status.HTTP_200_OK)

@api_view(['get'])
def viewEvent(request,usr):
    #print(usr)
    usr = User.objects.filter(id=usr).first()
    usrrl = Usr.objects.filter(user=usr).first()
    event = EventScheduler.objects.filter(usr=usrrl).values()
    #print(event)
    listevent = []
    
    for i in event:
        listevent.append(str(i['scheduleOn']).split(' ')[0])
        
    print(listevent)

    return Response(listevent)

@api_view(['get'])
def deleteEvent(request,usr):
    usr = User.objects.filter(id=usr).first()
    usrrl = Usr.objects.filter(user=usr).first()
    event = EventScheduler.objects.filter(usr=usrrl).first()
    event.delete()
    return Response('event deleted successfuly', status=status.HTTP_200_OK) 
