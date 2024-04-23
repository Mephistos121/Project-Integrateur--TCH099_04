package com.example.projetintegrateur_tch099;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class PaiementInfoCarte extends AppCompatActivity {

    private Button chosirButton;
    private Button backButton;
    private Film film;
    private Representation representation;
    private int place;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_paiement_info_carte);


        backButton = findViewById(R.id.carteBack);
        chosirButton = findViewById(R.id.carteChoisir);

        backButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });

        chosirButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(PaiementInfoCarte.this, PaiementInfoBilling.class);
                i.putExtra("representation",representation);
                i.putExtra("place",place);
                startActivity(i);
            }
        });

    }
}