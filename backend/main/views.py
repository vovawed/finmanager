from .serializers import *
from .models import *
from rest_framework import viewsets
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Sum
from django.utils.dateparse import parse_date


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all().order_by('-date')
    serializer_class = TransactionSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by('-pk')
    serializer_class = CategorySerializer
    pagination_class = None  # Disable paginate for categories

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UserDashboard(APIView):
    def get_queryset(self, user):
        return Transaction.objects.filter(category__user=user)

    def user_balance(self, queryset):
        return queryset.aggregate(Sum('amount'))['amount__sum']

    def get(self, request, format=None):
        queryset = self.get_queryset(request.user)
        return Response({
            'balance': self.user_balance(queryset)
        })


class ChartData(ListAPIView):
    serializer_class = TransactionSerializer
    pagination_class = None  # Disable paginate

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        queryset = Transaction.objects

        transaction_type = self.request.data['transactionType']
        queryset = queryset.filter(category__transaction_type=transaction_type)

        date_from = self.request.data['dateFrom']
        date_to = self.request.data['dateTo']
        queryset = queryset.filter(date__gte=date_from, date__lte=date_to)

        # Categories
        if not self.request.data['allCategories']:
            categories = self.request.data['categories']
            queryset = queryset.filter(category__pk__in=categories)

        return queryset.order_by('date')

    def post(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
