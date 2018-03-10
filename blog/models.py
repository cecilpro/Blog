from django.db import models
from django.contrib import admin

# Create your models here.

class Article(models.Model):
    title = models.CharField(max_length = 150)
    body = models.TextField()
    timestamp = models.DateTimeField()

class Debug(models.Model):
	que = models.TextField()
	timestamp = models.DateTimeField()
	sol = models.TextField(blank=True)

class Word(models.Model):
	body = models.TextField(blank=True)
	timestamp = models.DateTimeField()

class ArticleAdmin(admin.ModelAdmin):
	list_display = ('title','timestamp')

class DebugAdmin(admin.ModelAdmin):
	list_display = ('que','timestamp')

class WordAdmin(admin.ModelAdmin):
	list_display = ('body','timestamp')



admin.site.register(Article,ArticleAdmin)
admin.site.register(Debug,DebugAdmin)
admin.site.register(Word,WordAdmin)
