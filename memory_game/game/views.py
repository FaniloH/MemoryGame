from django.shortcuts import render
from django.http import JsonResponse

def home(request):
    return render(request, 'game/home.html')

def save_score(request):
    if request.method == 'POST':
        player_name = request.POST.get('player_name')
        score = request.POST.get('score')
        # Ici, vous pouvez ajouter la logique pour sauvegarder le score dans la base de données
        # Pour l'instant, nous allons simplement renvoyer une réponse JSON
        return JsonResponse({'status': 'success', 'message': f'Score de {score} enregistré pour {player_name}'})
    return JsonResponse({'status': 'error', 'message': 'Méthode non autorisée'}, status=405)

