FROM golang:1.11

ENV GOPATH=/go/src
WORKDIR /go/src/vue
COPY . .


RUN go build -mod=vendor -o vue

EXPOSE 3030

CMD ["./vue"]