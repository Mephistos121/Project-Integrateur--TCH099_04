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

public class CinemaListAdapter extends ArrayAdapter<Cinema> {
    private ArrayList<Cinema> cinemas;
    private Context contexte;
    private int viewResourceId;
    private Resources resources;
    public CinemaListAdapter(Context contexte, int viewResourceId, ArrayList<Cinema> cinemas){
        super(contexte, viewResourceId, cinemas);
        this.contexte = contexte;
        this.viewResourceId = viewResourceId;
        this.resources = contexte.getResources();
        this.cinemas = cinemas;
    }

    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {

        if(convertView== null){
            LayoutInflater layoutInflater = (LayoutInflater)contexte.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            convertView= layoutInflater.inflate(this.viewResourceId, parent,false);
        }

        final Cinema cinema = this.cinemas.get(position);

        if (cinema != null){
            final ImageView image = convertView.findViewById(R.id.cinemaPictureList);
            final TextView cinemaName = convertView.findViewById(R.id.cinemaNameList);
            Glide.with(convertView).load(cinema.getImage()).into(image);
            cinemaName.setText(cinema.getNomCinema());
        }

        return convertView;
    }
}
