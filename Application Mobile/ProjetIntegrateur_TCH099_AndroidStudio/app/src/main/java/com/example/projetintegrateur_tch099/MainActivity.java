package com.example.projetintegrateur_tch099;

import static android.content.ContentValues.TAG;
import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.gson.Gson;
import com.google.gson.JsonArray;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.lang.reflect.Array;
import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    TextView gsonPrint;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);

       ArrayList<Film> filmList = new ArrayList<>();


        //Create an object from a json string;
        //String data = "{\"id\":1,\"movieName\":\"Dune2\",\"linkOfImage\":\"linkOfImage\"}";
        //Film filmTest2 = gson.fromJson(data, Film.class);
        //json = gson.toJson(filmTest2);

        gsonPrint = findViewById(R.id.totalGson);
        gsonPrint.setText("HELLO WORLD");

        fetchMovies(filmList);

        //gsonPrint.setText(filmList.get(0).getNom_film());
    }

    private void fetchMovies(ArrayList<Film> filmList){
        String url = "https://equipe500.tch099.ovh/projet4/api/films";

        JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(Request.Method.GET, url, null, new Response.Listener<JSONArray>() {
            @Override
            public void onResponse(JSONArray jsonArray) {

                gsonPrint.setText(jsonArray.toString());

                for (int i = 0; i < jsonArray.length(); i++) {
                    try {
                        JSONObject jsonObject = jsonArray.getJSONObject(i);
                        String nom_film = jsonObject.getString("nom_film");
                        String image = jsonObject.getString("image");
                        String description = jsonObject.getString("description");

                        Film film = new Film(nom_film,image,description);
                        filmList.add(film);
                    } catch (JSONException e) {
                        //throw new RuntimeException(e);
                    }
                }
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError volleyError) {
                Toast.makeText(MainActivity.this, volleyError.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
        RequestQueue requestQueue = VolleySingleton.getInstance(this).getRequestQueue();
        requestQueue.add(jsonArrayRequest);
    }
}