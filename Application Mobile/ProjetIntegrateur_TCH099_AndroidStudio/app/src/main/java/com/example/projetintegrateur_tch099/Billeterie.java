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
import java.util.Arrays;

public class Billeterie extends AppCompatActivity {

    private Spinner spRepresentation;
    private Spinner spCinema;
    private Spinner spPlace;
    private TextView tvCout;
    private TextView tvNomFilm;
    private Button chosirButton;
    private Button backButton;
    private Film film;
    private Cinema cinema;
    private Representation representation;
    private String place;
    private boolean canResume;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_billeterie);

        canResume=false;

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
                    cinema=c;
                }
            }
        }

        ArrayAdapter<String> adapterCin = new ArrayAdapter<String>(this, R.layout.spinner_item,listCin);

        spCinema.setAdapter(adapterCin);


        ArrayList<String> listRep = new ArrayList<>();
        ArrayList<Representation> listRepr = new ArrayList<>();
        spCinema.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                listRep.clear();
                listRepr.clear();
                for (Representation r :RepresentationDao.getInstance(getApplicationContext()).getRepresentations()){
                    if(r.getCinema_id()==listCinId.get(position) && r.getFilm_id()==film.getId_film()){
                        listRep.add(r.getTemps());
                        listRepr.add(r);
                    }
                }
                ArrayAdapter<String> adapterRep = new ArrayAdapter<String>(getApplicationContext(), R.layout.spinner_item,listRep);
                spRepresentation.setAdapter(adapterRep);
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });
        ArrayList<String> listPla = new ArrayList<>();
        spRepresentation.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {

            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                representation = listRepr.get(position);
                listPla.clear();
                if(representation.getSalle()!=null) {
                    for (String pla :representation.getSalle().getPlaces()){
                        boolean notAlready=true;
                        for (Billet b :BilletDao.getInstance(getApplicationContext()).getBillets()) {
                            if (b.getRepId()==representation.getId() && b.getPlace().equals(pla)) {
                                notAlready = false;
                                break;
                            }
                        }
                        if (notAlready){
                            listPla.add(pla);
                        }
                    }


                    ArrayAdapter<String> adapterPla = new ArrayAdapter<String>(getApplicationContext(), R.layout.spinner_item, listPla);
                    spPlace.setAdapter(adapterPla);
                    tvCout.setText(String.valueOf(representation.getCout())); //temporaire
                }

            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });

        spPlace.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {

            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                place=listPla.get(position);
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });

        backButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                canResume=true;
                finish();
            }
        });

        chosirButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                canResume=true;
                if (representation!=null && place!=null) {
                    Intent i = new Intent(Billeterie.this, PaiementInfoCarte.class);
                    i.putExtra("representationId", representation.getId());
                    i.putExtra("place", place);
                    startActivity(i);

                }
            }
        });


    }

    @Override
    public void onResume() {
        super.onResume();
        if (canResume) {
            finish();
            startActivity(getIntent());
        }
    }
}