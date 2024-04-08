package com.example.projetintegrateur_tch099;

import android.content.Context;
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



    public FilmListAdapter(Context context, ArrayList<Film> filmList){
        super(context, R.layout.activity_film_list_view,filmList);
    }

    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {

        View view = convertView;

        if(view== null){
            LayoutInflater layoutInflater = (LayoutInflater) getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
           // view = LayoutInflater.inflate(R.layout.activity_film_list_view, parent, false);
        }

        Film film = getItem(position);

        ImageView image = convertView.findViewById(R.id.filmPictureList);
        TextView movieName = convertView.findViewById(R.id.filmName);

        Glide.with(convertView).load(film.getImage()).into(image);

        return view;
    }
}
