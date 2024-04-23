package com.example.projetintegrateur_tch099;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.bumptech.glide.Glide;

public class PaiementInfoCarte extends AppCompatActivity {

    private Button chosirButton;
    private Button backButton;
    private Film film;
    private Cinema cinema;
    private Representation representation;
    private String place;
    private TextView billetPlace;
    private TextView billetNomFilm;
    private TextView billetNomCinema;
    private TextView billetEmplacement;
    private TextView billetSalle;
    private TextView billetCout;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_paiement_info_carte);


        backButton = findViewById(R.id.carteBack);
        chosirButton = findViewById(R.id.carteChoisir);
        billetPlace = findViewById(R.id.billet_place);
        billetNomFilm = findViewById(R.id.billet_film);
        billetNomCinema = findViewById(R.id.billet_cinema);
        billetEmplacement = findViewById(R.id.billet_emplacement);
        billetSalle = findViewById(R.id.billet_salle);
        billetCout = findViewById(R.id.billet_cout);

        Bundle extras = getIntent().getExtras();

        RepresentationDao repDao = RepresentationDao.getInstance(getApplicationContext());
        for (Representation r : repDao.getRepresentations()){
            if(r.getId() == extras.getInt("representationId")){
                representation = r;
            }
        }

        place = extras.getString("place");

        film = FilmChoisiSingleton.getInstance().getFilmChoisi();
        CinemaDao dao = CinemaDao.getInstance(getApplicationContext());
        for (Cinema c : dao.getCinemas()){
            if(c.getId() == representation.getCinema_id()){
                cinema = c;
            }
        }

        billetPlace.setText(place);
        billetNomFilm.setText(film.getNom_film());
        billetNomCinema.setText(cinema.getNomCinema());
        billetEmplacement.setText(cinema.getLocalisation());
        billetSalle.setText(String.valueOf(representation.getSalle_id()));
        billetCout.setText(String.valueOf(representation.getCout()));




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
                i.putExtra("representationId",representation.getId());
                i.putExtra("place",place);
                startActivity(i);
            }
        });

    }
}