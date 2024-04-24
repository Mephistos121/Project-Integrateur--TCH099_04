package com.example.projetintegrateur_tch099;

import android.content.Context;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class UserDao {

    private static UserDao instance = null;
    private String currentSalt;

    private int userId;
    private String nomUsager;
    private String email;

    private ArrayList<Billet> listDeBillet;

    public void setUser(int userId, String nomUsager, String email, Context context) {
        instance = new UserDao(userId, nomUsager, email, context);
    }

    public static UserDao getInstance() {
        return instance;
    }
    public static UserDao getInstance(int userId, String nomUsager, String email,  Context context) {
        if (instance == null) {
            instance = new UserDao(userId, nomUsager, email, context);
        }
        return instance;
    }

    public void reload(Context context){
        listDeBillet.clear();
        fetchAllBillet(context);
    }

    private UserDao(int userId, String nomUsager, String email,  Context context){
        this.userId = userId;
        this.nomUsager = nomUsager;
        this.email = email;
        listDeBillet = new ArrayList<>();
        fetchAllBillet(context);
    }

    public String getBilletTest(){
        return  "HELLO";
    }


    private void fetchAllBillet(Context context){
        //curently only the id 3 has any movies attached to it.
        String url = "https://equipe500.tch099.ovh/projet4/api/billets/user/"+userId;
        JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(Request.Method.GET, url, null, new Response.Listener<JSONArray>() {
            @Override
            public void onResponse(JSONArray jsonArray) {

                if(jsonArray.length() < 1){
                    listDeBillet.add(new Billet(-1,-1, "error1"));

                }else {
                    for (int i = 0; i < jsonArray.length(); i++) {
                        try {
                            JSONObject jsonObject = jsonArray.getJSONObject(i);

                            listDeBillet.add(new Billet(jsonObject.getString("nom_film"), jsonObject.getString("temps"),
                                    jsonObject.getString("nom_cinema"), jsonObject.getInt("salle_id"), userId,
                                    jsonObject.getString("place"), jsonObject.getString("emplacement")));

                        } catch (JSONException e) {
                            System.out.println(e.getMessage());
                        }
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

    public String getCurrentSalt() {
        return currentSalt;
    }

    public int getUserId() {
        return userId;
    }

    public String getNomUsager() {
        return nomUsager;
    }

    public String getEmail() {
        return email;
    }

    public ArrayList<Billet> getListDeBillet() {
        return listDeBillet;
    }


}
