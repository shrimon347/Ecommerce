from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated , IsAdminUser
from rest_framework.response import Response


from base.models import Product, Order, OrderItem, ShippingAddress
from base.serializers import ProductSerilalizer, OrderItemSerilalizer

from rest_framework import status

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):


    user = request.user
    data = request.data
    oderItems = data['orderItems']

    if oderItems and len(oderItems) == 0:
        return Response({'detail':'No order Items'}, status=status.HTTP_400_BAD_REQUEST)
    
    else :
        #(1) create order

        order = Order.objects.create(
            user = user,
            paymentMethod = data['paymentMethod'],
            taxPrice = data['taxPrice'],
            shippingPrice = data['shippingPrice'],
            totalPrice = data['totalPrice']
        )

        # (2) shippinng Address create

        shipping = ShippingAddress.objects.create(
            order = order,
            address = data['shippingAddress'] ['address'],
            city = data['shippingAddress'] ['city'],
            postalCode = data['shippingAddress'] ['postalCode'],
            country = data['shippingAddress'] ['country']
        )

        #(3) order items created

        for i in oderItems:
            product = Product.objects.get(_id=i['product'])

            item = OrderItem.objects.create(
                product = product,
                order = order,
                name = product.name,
                qty = i['qty'],
                price = i['price'],
                image = product.image.url,
            )

            # (4) update stock

            product.countInStock -= item.qty
            product.save()


        serializer = OrderItemSerilalizer(order, many = False)
        return Response(serializer.data)
