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

public class FilmListAdapter extends ArrayAdapter<Film> {

    private ArrayList<Film> films;
    private Context contexte;
    private int viewResourceId;
    private Resources resources;
    public FilmListAdapter(Context contexte, int viewResourceId, ArrayList<Film> filmList){
        super(contexte, viewResourceId, filmList);
        this.contexte = contexte;
        this.viewResourceId = viewResourceId;
        this.resources = contexte.getResources();
        this.films = filmList;
    }

    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {

        if(convertView== null){
            LayoutInflater layoutInflater = (LayoutInflater)contexte.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            convertView= layoutInflater.inflate(this.viewResourceId, parent,false);
        }

        final Film film = this.films.get(position);

        if (film != null){
            final ImageView image = convertView.findViewById(R.id.imageView_filmListItem);
            final TextView movieName = convertView.findViewById(R.id.textView_filmListItem);
            Glide.with(convertView).load(film.getImage()).into(image);
            movieName.setText(film.getNom_film());
        }

        return convertView;
    }
}
