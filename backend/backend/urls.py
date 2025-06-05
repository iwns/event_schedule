
from django.contrib import admin
from django.urls import path
from eventscheduler import views
from eventscheduler.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('setCsrf/',views.setCsrf),
    path('eventAdd/<usr>',views.createEvent),
    path('createAccount/',views.createAccount),
    path('login/',loginUsr.as_view(),name='login'),
    path('eventEdit/<usr>',views.editEvent),
    path('eventDelete/<usr>',views.deleteEvent),
    path('eventView/<usr>',views.viewEvent)
]
