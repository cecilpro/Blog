from django.db import models
from django.contrib import admin
from django.utils import timezone

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

class Message(models.Model):
    name = models.CharField(max_length = 30)
    email = models.CharField(max_length = 30)
    body = models.TextField(blank=True)
    siteurl = models.CharField(max_length = 150,blank=True)
    timestamp = models.DateTimeField(editable=False)
    
    def save(self, *args, **kwargs):
        self.timestamp = timezone.localtime(timezone.now())
        return super(Message, self).save(*args, **kwargs)

class ArticleAdmin(admin.ModelAdmin):
	list_display = ('title','timestamp')

class DebugAdmin(admin.ModelAdmin):
	list_display = ('que','timestamp')

class WordAdmin(admin.ModelAdmin):
	list_display = ('body','timestamp')

class MessageAdmin(admin.ModelAdmin):
	list_display = ('name','timestamp','body')


admin.site.register(Article,ArticleAdmin)
admin.site.register(Debug,DebugAdmin)
admin.site.register(Word,WordAdmin)
admin.site.register(Message,MessageAdmin)
