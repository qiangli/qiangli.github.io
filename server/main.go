package main

import (
	"log"
	"net/http"
	"os"
)

func main() {
	directory := "out/" // Change this path to your preferred directory

	fileServer := http.FileServer(http.Dir(directory))

	http.Handle("/", fileServer)

	port := os.Getenv("PORT")
	if port == "" {
		port = "18080" // Default port
	}

	log.Printf("Starting server on port %s...", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal(err)
	}
}