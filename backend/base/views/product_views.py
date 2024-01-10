from rest_framework.decorators import api_view
from rest_framework.response import Response


from base.models import Product
from base.serializers import ProductSerilalizer


@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serilalizer = ProductSerilalizer(products, many=True)
    return Response(serilalizer.data)

@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id = pk)
    serilalizer = ProductSerilalizer(product, many= False)
    return Response(serilalizer.data)
