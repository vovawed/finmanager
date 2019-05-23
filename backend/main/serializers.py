from .models import *
from rest_framework import serializers
from django.contrib.humanize.templatetags.humanize import naturaltime


class TransactionSerializer(serializers.ModelSerializer):
    date_str = serializers.SerializerMethodField('date')

    def date(self, obj):
        return naturaltime(obj.date)

    class Meta:
        model = Transaction
        fields = ('pk', 'title', 'category', 'amount', 'date', 'date_str')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('pk', 'title', 'transaction_type',)
