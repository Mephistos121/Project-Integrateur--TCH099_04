package com.example.projetintegrateur_tch099;

import android.content.Context;
import android.content.res.Resources;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.bumptech.glide.Glide;

import java.util.ArrayList;

public class BilletListAdapter extends ArrayAdapter<Billet> {
    private ArrayList<Billet> billets;
    private Context contexte;
    private int viewResourceId;
    private Resources resources;
    public BilletListAdapter(Context contexte, int viewResourceId, ArrayList<Billet> billetList){
        super(contexte, viewResourceId, billetList);
        this.contexte = contexte;
        this.viewResourceId = viewResourceId;
        this.resources = contexte.getResources();
        this.billets = billetList;
    }

    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {

        if(convertView== null){
            LayoutInflater layoutInflater = (LayoutInflater)contexte.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            convertView = layoutInflater.inflate(this.viewResourceId, parent,false);
        }

        final Billet billet = this.billets.get(position);

        if (billet != null){
            final TextView film = convertView.findViewById(R.id.billetListFilm);
            final TextView date = convertView.findViewById(R.id.billetListDate);
            final TextView cinema = convertView.findViewById(R.id.billetListCinema);
            final TextView salle = convertView.findViewById(R.id.billetListSalle);
            final TextView siege = convertView.findViewById(R.id.billetListSiege);
            final TextView emplacement = convertView.findViewById(R.id.billetListEmplacement);
            film.setText(billet.getNomFilm());
            date.setText(billet.getTemps());
            cinema.setText(billet.getNomCinema());
            salle.setText(billet.getSalleId());
            siege.setText(billet.getPlace());
            emplacement.setText(billet.getEmplacement());
        }

        return convertView;
    }
}
