# python-projects

##How to build the project

1. install python , django and djangorestframework

```sh
pip install djangorestframework
```

2. create a new django project using the command

```sh
django-admin startproject PROJECTNAME
```

NOTE : if you have issue Adjust the PATH If you'd like to fix the django-admin command for future use, you can add the directory where Django is installed to your system's PATH. Based on the information provided, the path is:

```sh
C:\Users\Salim\AppData\Roaming\Python\Python312\Scripts
```

To add it to your PATH on Windows:
Press Win + S, search for "Environment Variables," and select "Edit the system environment variables."
In the System Properties window, click "Environment Variables."
Under "User variables" or "System variables," find and select the Path variable, then click "Edit."
Click "New" and add the path C:\Users\Salim\AppData\Roaming\Python\Python312\Scripts.
Click "OK" to save the changes.
After doing this, restart your terminal, and the django-admin command should work properly.

3. navigate to the project directory

```sh
cd /PROJECTNAME
```

4. add an app to the same project :

```sh
 django-admin startapp APP_NAME
```

5.  install app for example "api" app we added

- Go to `INSTALLED_APPS ` in `settings.py`:
- add this line to the list :

```sh
  'api.apps.ApiConfig'
```

- add this line as well :

```sh
  'res_framework'
```

6.  First time you need to initial the database (or after adding new model to database ) you need to run this :

```sh
  py ./manage.py makemigrations
```

```sh
  py ./manage.py migrate
```

after runing that the `db.sqlite3 will show up .

7.  Run your webserver ,check your browser on [http://127.0.0.1:8000/]

```sh
  py ./manage.py runserver
```

## Use your app urlsand views:

our project name is `music_controller` and example of app called `api`:

1.  in `api/views.py` you create your views here , for exemple it return "Hellw Word" :

```sh
from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.
def main(request):
    return HttpResponse("<h1>Hello, world!<h1/>")
```

2.  to access to that view you need to create `api/urls.py` to store all the urls local to this app "api"

```sh
from django.urls import path
from .views import main

urlpatterns = [

    path('',main),

]
```

Note : in case you want to change the route name for example to `http://localhost:8000/api/home` you need to update the path

```sh
urlpatterns = [
    path('home',main),
]
```

3. Dispatch app urls : in `music_controller/urls.py` you need to import the `api/urls.py`

```sh
from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),

]
```

## Add model

in `api/models.py`we can insert all models we want for example:

```sh
from django.db import models
import string
import random


def generate_unique_code():
    length = 6

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Room.objects.filter(code=code).count() == 0:
            break

    return code
# Create your models here.
class Room(models.Model):
    code = models.CharField(max_length=8, default="", unique=True)
    host = models.CharField(max_length=50, unique=True)
    guest_can_pause = models.BooleanField(null=False, default=False)
    votes_to_skip = models.IntegerField(null=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True)
```

## Add serializer

- In Django, when you're working with APIs, especially using Django REST Framework (DRF), a serializer is used to convert complex data types (like Django models) into Python data types that can then be easily converted into JSON or other content types. Serializers also handle the reverse process: they validate and convert incoming data (like JSON) back into complex types.
- In simple words: `Serializer = Translator`
- It `converts` data from your `Django models to JSON` (which can be sent as a response in an API).
  It converts incoming JSON data (like from an API request) into Django models or Python data types, while also validating the data.
- in our apiexample we can add the file `api/serializers.p` :

```sh
from rest_framework import serializers
from .models import Room


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'code', 'host', 'guest_can_pause',
                  'votes_to_skip', 'created_at')
```

- Now we can change the `api/view.py` file and use the `model` and `Serializer` :

```sh
from django.shortcuts import render
from rest_framework import generics
from .serializers import RoomSerializer
from .models import Room

# Create your views here.

class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
```

- also updating the `api/urls.py` file :

```sh
from django.urls import path
from .views import RoomView

urlpatterns = [
    path('room', RoomView.as_view()),
]
```

check this link: [https://www.youtube.com/watch?v=6c2NqDyxppU&list=PLzMcBGfZo4-kCLWnGmK0jUBmGLaJxvi4j&index=3]
