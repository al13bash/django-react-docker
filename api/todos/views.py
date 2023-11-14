from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from datetime import datetime
from todos.models import Todo
from django.views.decorators.csrf import ensure_csrf_cookie
import json
from django.forms.models import model_to_dict
from django.db.models import Q

@ensure_csrf_cookie
def current_datetime(request):
  current_time = datetime.now().strftime("%-I:%M %p")
  current_date = datetime.now().strftime("%A %B %-d, %-Y")

  data = {
    'time': current_time,
    'date': current_date
  }

  return JsonResponse(data)

@ensure_csrf_cookie
def index(request):
  f = Q()
  if request.GET.get('completed'):
    f &= Q(completed=request.GET.get('completed'))
  if request.GET.get('s'):
    f &= Q(text__icontains=request.GET.get('s'))
  todos = Todo.objects.filter(f).order_by('completed', 'id').values()

  return JsonResponse(list(todos), safe=False)

@ensure_csrf_cookie
def create(request):
  request_body = json.loads(request.body)
  todo = Todo(text=request_body['text'])
  todo.save()

  return JsonResponse(model_to_dict(todo))

@ensure_csrf_cookie
def update(request, id):
  request_body = json.loads(request.body)
  todo = Todo.objects.get(pk=id)
  todo.completed = request_body['completed']
  todo.save()

  return JsonResponse(model_to_dict(todo))

@ensure_csrf_cookie
def delete(request, id):
  todo = Todo.objects.get(pk=id)
  todo.delete()

  return JsonResponse({ 'success': True })