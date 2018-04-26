from django import forms
class MessageForm(forms.Form):
    name = forms.CharField(max_length = 30,label='你的名字',widget=forms.TextInput(attrs={'placeholder': '告诉我你叫什么名字吧.'}))
    email = forms.EmailField(max_length = 30,label='Email',widget=forms.TextInput(attrs={'placeholder': '方便找到你呀.'}))
    siteurl = forms.URLField(max_length = 150,label='你的站点',widget=forms.TextInput(attrs={'placeholder': '告诉我你的窝吧.'}))
    body = forms.CharField(label='留言内容',widget=forms.Textarea(attrs={'placeholder': '想说点什么呀.'}))
