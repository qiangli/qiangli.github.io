package main

import (
	"log"
	"net/http"
	"os"
)

// simple static page web server serve files with a given local directory
func main() {
	// Set the directory to serve files from
	directory := "out/" // Change this path to your preferred directory

	// Create a file server handler
	fileServer := http.FileServer(http.Dir(directory))

	// Use the file server to handle all requests at the root url "/"
	http.Handle("/", fileServer)

	// Get the port from the environment variables or use default
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // Default port
	}

	// Start the server
	log.Printf("Starting server on port %s...", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal(err)
	}
}