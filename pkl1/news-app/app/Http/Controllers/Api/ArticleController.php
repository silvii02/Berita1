<?php
namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\Article;
use App\Models\User; 
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::orderBy('created_at', 'desc')->get();
        return response()->json($articles);
    }

//     public function updateViews($id)
//     {
//         $article = Article::find($id);

//         if ($article) {
//             $article->increment('views');
//             return response()->json($article);
//         }

//         return response()->json(['error' => 'Article not found'], 404);
//     }

 public function show($id)
     {
         $article = Article::find($id);
         if (!$article) {
             return response()->json(['message' => 'Article not found'], 404);
         }
         $article->views += 1;
         $article->save();
         return response()->json($article);
     }

public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'body' => 'required|string',
            'category_id' => 'required|integer|exists:categories,id',
            'author_id' => 'required|integer|exists:users,id',
            'views' => 'nullable|integer',
            'slug' => 'nullable|string|unique:articles,slug',
        ]);

        $user = User::findOrFail($request->author_id);
        $validatedData['author_name'] = $user->name;

        if (!$request->filled('slug')) {
            $validatedData['slug'] = Str::slug($request->title, '-');
        }

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $path = $image->store('images', 'public');
            $validatedData['image_url'] = $path;
            $validatedData['image_url'] = '/storage/' . $path;
        }

        $article = Article::create($validatedData);

        return response()->json($article, 201);
    }


// public function getPopularArticles()
//     {
//         $articles = Article::orderBy('views', 'desc')->limit(5)->get();
//         if ($articles->isEmpty()) {
//             return response()->json(['message' => 'Article not found'], 404);
//         }

//         return response()->json($articles);
//     }

 public function getRelatedArticles($category_id, $current_article_id)
     {
         $articles = Article::where('category_id', $category_id)
                             ->where('id', '!=', $current_article_id)
                             ->orderBy('created_at', 'desc')
                             ->take(8)
                             ->get();

        return response()->json($articles);
    }

public function destroy($id)
{
    Article::destroy($id);
    return response()->json(null, 204);
}

 public function update(Request $request, $id)
     {
         $article = Article::findOrFail($id);  
         $validatedData = $request->validate([
             'title' => 'required|string|max:255',
             'body' => 'required|string',
             'category_id' => 'required|exists:categories,id',
             'tags' => 'nullable|string',
             'author_id' => 'required|integer|exists:users,id',
             'slug' => 'nullable|string|unique:articles,slug,'.$article->id,
             'views' => 'nullable|integer',
         ]);

        $validatedData['image_url'] = $request->image_url ?? $article->image_url;
        $article->update($validatedData);
        return response()->json($article, 200);
    }

    public function search(Request $request)
    {
        // Validasi input
        $request->validate([
            'query' => 'required|string|min:3'
        ]);
    
        // Ambil query dari input
        $query = $request->input('query');
    
        try {
            // Pencarian berdasarkan judul yang mengandung kata kunci dengan kondisi LIKE
            $results = Article::where('title', 'LIKE', "%{$query}%")->get();
    
            // Mengembalikan hasil pencarian dalam bentuk JSON
            return response()->json($results);
        } catch (\Exception $e) {
            // Log error dan mengembalikan respons error 500 jika ada masalah
            \Log::error($e->getMessage());
            return response()->json(['message' => 'Internal Server Error'], 500);
        }
    }
    
 }