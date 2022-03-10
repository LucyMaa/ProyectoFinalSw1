import {NavigatorScreenParams, DefaultNavigatorOptions} from "@react-navigation/native";

type movie = {
    id: number,
    poster_path: string,
    title: string,
    release_date: string,
    vote_average: string,
    backdrop_path: string,
    original_title: string,
    overview: string,

}

export type RootStackParamList = {
    //Home: { img?: string };
    //Tab: { screen?: string, params?: { nombrecomida?: string, img?: string } };
    Tab: NavigatorScreenParams<TabParamList>
    Camera: undefined;
};

export type TabParamList = {
    Home: { img?: string },
    Home2: { nombrecomida?: string }
}
