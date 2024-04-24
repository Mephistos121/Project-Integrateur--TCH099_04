package com.example.projetintegrateur_tch099;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
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
import com.android.volley.toolbox.JsonObjectRequest;

import org.json.JSONException;
import org.json.JSONObject;

public class PaiementInfoBilling extends AppCompatActivity {

    private Button chosirButton;
    private Button backButton;
    private int representationId;
    private String place;
    private EditText inputNom;
    private EditText inputPrenom;
    private EditText inputAdresse;
    private EditText inputVille;
    private EditText inputPays;
    private EditText inputCodePostal;
    private EditText inputNumTel;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_paiement_info_billing);

        backButton = findViewById(R.id.billingBack);
        chosirButton = findViewById(R.id.billingChoisir);

        inputNom = findViewById(R.id.input_nom);
        inputPrenom = findViewById(R.id.input_prenom);
        inputAdresse = findViewById(R.id.input_adresse);
        inputVille = findViewById(R.id.input_ville);
        inputCodePostal = findViewById(R.id.input_code_postal);
        inputPays = findViewById(R.id.input_pays);
        inputNumTel = findViewById(R.id.input_num_tel);

        Bundle extras = getIntent().getExtras();

        representationId =  extras.getInt("representationId");

        place = extras.getString("place");

        backButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });

        chosirButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if (isNumTel() && !(inputNom.getText().toString().isEmpty()
                        || inputPrenom.getText().toString().isEmpty()
                        || inputAdresse.getText().toString().isEmpty()
                        || inputVille.getText().toString().isEmpty()
                        || inputCodePostal.getText().toString().isEmpty()
                        || inputPays.getText().toString().isEmpty())){
                    postBillet();
                }

            }
        });
    }

    private boolean isNumTel(){
        return inputNumTel.getText().toString().length() == 10;
    }

    public void postBillet(){

        String url = "https://equipe500.tch099.ovh/projet4/api/billets/ajout";

        JSONObject jsonObject = new JSONObject();

        try {
            jsonObject.put("usager_id", UserDao.getInstance().getUserId());
            jsonObject.put("place", place);
            jsonObject.put("representation_id", representationId);

        }catch (JSONException e){
            e.printStackTrace();
        }

        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.POST, url, jsonObject, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject jsonObject) {

                if (jsonObject == null) {
                    Toast.makeText(PaiementInfoBilling.this, "BilletIncorrect", Toast.LENGTH_LONG).show();
                } else {
                    Toast.makeText(PaiementInfoBilling.this, "Billet ajouté", Toast.LENGTH_LONG).show();
                    UserDao.getInstance().reload(getApplicationContext());
                }
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError volleyError) {
                Toast.makeText(PaiementInfoBilling.this, "Error With billet info", Toast.LENGTH_SHORT).show();
            }
        });

        RequestQueue requestQueue = VolleySingleton.getInstance(getApplicationContext()).getRequestQueue();
        requestQueue.add(jsonObjectRequest);
    }
}