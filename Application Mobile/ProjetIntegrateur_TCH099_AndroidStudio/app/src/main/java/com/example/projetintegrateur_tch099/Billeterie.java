package com.example.projetintegrateur_tch099;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;

import java.util.ArrayList;

public class Billeterie extends AppCompatActivity {

    private Spinner spRepresentation;
    private Spinner spCinema;
    private Spinner spPlace;
    private TextView tvCout;
    private TextView tvNomFilm;
    private Button chosirButton;
    private Button backButton;
    private Film film;
    private Representation representation;
    private String place;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_billeterie);

        film = FilmChoisiSingleton.getInstance().getFilmChoisi();


        backButton = findViewById(R.id.billetRetour);
        chosirButton = findViewById(R.id.billetChoix);

        spCinema = findViewById(R.id.billetCinema);
        spPlace = findViewById(R.id.choixPlace);
        spRepresentation = findViewById(R.id.billetRepresentation);
        tvCout = findViewById(R.id.billetCout);
        tvNomFilm = findViewById(R.id.billetNomFilm);

        tvNomFilm.setText(film.getNom_film());

        CinemaDao dao = CinemaDao.getInstance(getApplicationContext());



        ArrayList<Cinema> daoCinemaList = dao.getCinemas();

        ArrayList<String> listCin = new ArrayList<>();
        ArrayList<Integer> listCinId = new ArrayList<>();


        for (Cinema c : daoCinemaList){
            for (Film f : c.getListDeFilm()){
                if (f.getId_film() == film.getId_film()){
                    listCin.add(c.getNomCinema() + " " + c.getLocalisation());
                    listCinId.add(c.getId());
                }
            }
        }



        ArrayAdapter<String> adapterCin = new ArrayAdapter<String>(this, R.layout.spinner_item,listCin);

        spCinema.setAdapter(adapterCin);


        spCinema.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                ArrayList<String> listRep = new ArrayList<>();
                listRep.add("aa");
                ArrayAdapter<String> adapterRep = new ArrayAdapter<String>(getApplicationContext(), R.layout.spinner_item,listRep);
                spRepresentation.setAdapter(adapterRep);
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });

        spRepresentation.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {

            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                ArrayList<String> listPla = new ArrayList<>();
                listPla.add("bb");
                ArrayAdapter<String> adapterPla = new ArrayAdapter<String>(getApplicationContext(), R.layout.spinner_item,listPla);
                spPlace.setAdapter(adapterPla);
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });

        spPlace.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {

            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                tvCout.setText("10"); //temporaire
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });



        backButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });

        chosirButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(Billeterie.this, PaiementInfoCarte.class);
                i.putExtra("representation",representation);
                i.putExtra("place",place);
                startActivity(i);
            }
        });


    }
}