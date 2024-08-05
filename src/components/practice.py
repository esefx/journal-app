@app.route('/analyze', methods=['POST'])
def analyze_audio():
    client = HumeBatchClient(HUME_API_KEY)
    
    # Get the audio file URL from the request
    audio_url = request.json.get('audio_url')
    
    if not audio_url:
        return jsonify({"error": "No audio URL provided"}), 400
    
    # Configure the models
    configs = [ProsodyConfig(), BurstConfig()]
    
    # Submit the job
    job = client.submit_job(audio_url, configs)
    
    print(f"Job submitted: {job}")
    print("Running...")
    
    # Wait for the job to complete
    details = job.await_complete()
    
    # Get the predictions
    predictions = job.get_predictions()
    
    return jsonify(predictions)