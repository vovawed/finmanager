from .serializers import *
from .models import *
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Sum


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
