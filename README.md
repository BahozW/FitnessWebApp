# Fitness Web App with Next.js

## Table of Contents
- [Demo Video](#demo-video)
- [Introduction](#introduction)
- [Backend API](#backend-api)
- [Technology Requirements](#technology-requirements)
- [Functional Requirements](#functional-requirements)

## Demo Video
A video demonstrating the functionality of the Fitness Web App is available [here](https://youtu.be/_EC_afN7Nbc). In this video, you can see how users can log in, personal trainers create workout programs, add exercises, and clients access their workout programs.

## Introduction

Welcome to the Fitness Web App project! This web app is designed to help personal trainers and fitness center managers create and manage workout programs for individual clients. The application is built using Next.js and combines server-side and client-side components. Below, you will find details about the project requirements and how to access the backend API.

## Technology Requirements

- **Front-end Framework**: Next.js

- **Deployment**: The web app has been deployed to a public cloud platform [here](https://fitness-web-app-three.vercel.app/api/auth/signin?callbackUrl=%2Fdashboard%2Fmanager)

## Functional Requirements

### Basic Functionality

#### User Authentication

- Users should be able to log in.

#### Manager

- The manager can create users, specifically personal trainers.

#### Personal Trainer

- Personal trainers can create users, particularly clients.
- They can create new workout programs for their clients.
- Personal trainers can add new exercises to a workout program.
  - An exercise should have a name, description, number of sets, and either the number of repetitions or the time it should last.
- They can view a list of workout programs.
- They can view a specific workout program.
- Personal trainers can see a list of their clients.

#### Client

- Clients can view their workout programs.