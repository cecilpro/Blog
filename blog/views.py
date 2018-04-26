from django.shortcuts import render
from blog.models import Article, Debug, Word, Message
from django.shortcuts import render_to_response, render
from django.http import HttpResponse
from blog.forms import MessageForm
from blog.markdown.translater import getHTML
# Create your views here.

def page_not_found(request):
	return render_to_response('error/404.html')

def page_error(request):
	return render_to_response(request, 'error/500.html')

def permission_denied(request):
	return render_to_response(request, 'error/403.html')



def index(request):
	return render_to_response('index.html')

def article(request,title=''):
	page = 0
	current = 0
	num = len(Article.objects.order_by('-timestamp'))
	if num%5 != 0:
		page = num//5 + 1
	else:
		page = num//5


	if title == '':
		title = '$1'
		#article_list = Article.objects.order_by('-timestamp')#按时间戳排序
	if title[0] == '$' and title[1:].isdigit():
		article_list = Article.objects.order_by('-timestamp')[(int(title[1:])-1)*5:int(title[1:])*5]#按时间戳排序
		current = int(title[1:])
	else:
		if(title[-1:] == '/'):
			title = title[:-1]
		article_list = Article.objects.filter(title = title)
	for n in article_list:
		n.body = getHTML(n.body)
	return render_to_response('article.html',{'article_list' : article_list,'current' : current,'page' : range(1,page+1)})

def debug(request,title=''):
	page = 0
	current = 0
	num = len(Debug.objects.order_by('-timestamp'))
	if num%5 != 0:
		page = num//5 + 1
	else:
		page = num//5


	if title == '':
		title = '$1'
	if title[0] == '$' and title[1:].isdigit():
		debug_list = Debug.objects.order_by('-timestamp')[(int(title[1:])-1)*5:int(title[1:])*5]#按时间戳排序
		current = int(title[1:])
	for n in debug_list:
		n.que = getHTML(n.que)
		n.sol = getHTML(n.sol)
	return render_to_response('debug.html',{'debug_list' : debug_list,'current' : current,'page' : range(1,page+1)})

def word(request,title=''):
	page = 0
	current = 0
	num = len(Word.objects.order_by('-timestamp'))
	if num%5 != 0:
		page = num//5 + 1
	else:
		page = num//5


	if title == '':
		title = '$1'
	if title[0] == '$' and title[1:].isdigit():
		word_list = Word.objects.order_by('-timestamp')[(int(title[1:])-1)*5:int(title[1:])*5]#按时间戳排序
		current = int(title[1:])
	for n in word_list:
		n.body = getHTML(n.body)
	return render_to_response('word.html',{'word_list' : word_list,'current' : current,'page' : range(1,page+1)})


def message(request):
    message_list = Message.objects.order_by('-timestamp')
    form = MessageForm()
    if request.method == 'POST':
        form = MessageForm(request.POST)
        if form.is_valid():#验证数据是否合法
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            body = form.cleaned_data['body']
            siteurl = form.cleaned_data['siteurl']
            Message.objects.create(name=name,email=email,body=body,siteurl=siteurl)
            form = MessageForm()
    return render(request,'message.html',{'form': form,'message_list': message_list})

