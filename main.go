package main

import (
	"log"
	"net/http"
)

func main() {
	h := http.FileServer(http.Dir("."))
	http.Handle("/", h)

	log.Println("Listening...")
	http.ListenAndServe(":3030", nil)
}
