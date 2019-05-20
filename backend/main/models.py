from django.db import models
from django.contrib.auth.models import User


class Category(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField('Title', max_length=50)
    transaction_type = models.CharField('Transaction type', max_length=1, choices=(
        ('i', 'Income'),
        ('e', 'Expense')
    ))


class Transaction(models.Model):
    title = models.CharField('Title', max_length=50, blank=True, null=True, default=None)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    amount = models.FloatField('Amount')
    date = models.DateTimeField('Date', auto_now_add=True)
