
let accessToken = localStorage.getItem("accessToken");;
let expiresIn;
let client_id = '6faa236d5df94ce7b45883fc860f061f';
let redirect_uri = 'https://spotify-cc.surge.sh/';
let url = window.location.href;

let Spotify = {
    // Get Access Token
    getAccessToken() {
        if (accessToken) {
            localStorage.clear()
            return accessToken;
        }
        console.log(accessToken)
        const myAccessToken = url.match(/access_token=([^&]*)/);
        const myExpiresIn = url.match(/expires_in=([^&]*)/);
        if (myAccessToken && myExpiresIn) {
            accessToken = myAccessToken[1];
            expiresIn = myExpiresIn[1];
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            localStorage.clear();
        }
        else {
            let scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private playlist-modify-private playlist-modify-public';
            scope = '&scope=' + encodeURIComponent(scope);
            window.location.href = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&${scope}&redirect_uri=${redirect_uri}`;

        }




    },

    async search(searchTerm) {
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        const jsonReponse = await response.json();
        if (jsonReponse.tracks.items.length === 0) {
            return [];
        }
        let myArr = jsonReponse.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
        }));
        return myArr;
    }



    ,

    async savePlaylist(name, arrayOfTracks) {
        if (!name || !arrayOfTracks.length) {
            console.log("first block")
            return;
        }

        

        const userAccessToken = accessToken;
        const headers = {
            Authorization: `Bearer ${userAccessToken}`
        };

        // Fetch the user ID
        const userResponse = await fetch('https://api.spotify.com/v1/me', { headers });
        const userJson = await userResponse.json();
        const userID = userJson.id;
        // Create the playlist
        //Request URL: https://api.spotify.com/v1/users/abdullah39248/playlists

        const requestBody = {
            name: name,
            description: 'New playlist description',
            public: false
        };

        const playlistResponse = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody)
        });

        const playlistJson = await playlistResponse.json();
        let playlistID = playlistJson.id;

        const secondHeaders = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        };
        let myURI = arrayOfTracks.map(item =>{
            return item.uri;
        })
        console.log(myURI)
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
            method: 'POST',
            headers: secondHeaders,
            body: JSON.stringify({
                uris: myURI
            })
        });
        const jsonResponse = await response.json();
        return jsonResponse.snapshot_id;





    }
}



export default Spotify;