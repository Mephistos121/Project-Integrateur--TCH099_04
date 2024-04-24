package com.example.projetintegrateur_tch099;

import android.content.Context;
import android.util.Log;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class BilletDao {
    private static BilletDao instance = null;
    private final ArrayList<Billet> billets = new ArrayList<>();

    private BilletDao(Context context) {
        String url = "https://equipe500.tch099.ovh/projet4/api/billets";

        JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(Request.Method.GET, url, null, new Response.Listener<JSONArray>() {
            @Override
            public void onResponse(JSONArray jsonArray) {
                for (int i = 0; i < jsonArray.length(); i++) {
                    try {
                        JSONObject jsonObject = jsonArray.getJSONObject(i);

                        Billet billet = new Billet(jsonObject.getInt("usager_id"), jsonObject.getInt("representation_id"),
                                jsonObject.getString("place"));
                        billets.add(billet);

                    } catch (JSONException e) {
                        System.out.println(e.getMessage());
                    }

                }
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError volleyError) {
                //Toast.makeText(MainActivity.this, volleyError.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
        RequestQueue requestQueue = VolleySingleton.getInstance(context).getRequestQueue();
        requestQueue.add(jsonArrayRequest);
    }

    public static BilletDao getInstance(Context context) {
        if (instance == null) {
            instance = new BilletDao(context);
        }
        return instance;
    }

    public ArrayList<Billet> getBillets() {
        return billets;
    }

}

