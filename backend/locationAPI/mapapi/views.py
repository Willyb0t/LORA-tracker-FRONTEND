from rest_framework.decorators import api_view
from rest_framework.response import Response
import random

@api_view(['GET'])
def get_random_position(request):
    base_lat = 18.967770639779456
    base_lon = -99.6167424596692

    # Generar variaciones aleatorias cercanas a la base
    lat_variation = random.uniform(-0.01, 0.01)  # Ajusta el rango de variación según lo necesites
    lon_variation = random.uniform(-0.01, 0.01)

    # Crear una posición aleatoria cercana
    position = {
        "latitude": base_lat + lat_variation,
        "longitude": base_lon + lon_variation
    }

    return Response(position)

