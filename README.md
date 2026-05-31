# Intelligent Network Security Framework - UI

## Quick Start

```bash
cd D:\New
python app.py
```

Then open your browser to: **http://localhost:5000**

## Features

### Dashboard
- System status (initialized/not initialized)
- Architecture visualization (VAE → Cache → DDQN → FL)
- Current configuration display
- Quick stats (tests run, last F1, latency, privacy budget)

### Configuration
- Feature dimension (default: 42)
- Latent dimension (default: 32)
- VAE learning rate (default: 0.0001)
- Privacy epsilon (default: 2.4)
- Byzantine threshold (default: 0.2)
- Krum threshold scale (default: 3.0)

### Run Test
- Number of test samples (default: 500)
- Attack ratio (default: 0.3)
- Quick test button (100 samples)

### Results
- Detection metrics table:
  - Accuracy, Precision, Recall, F1-Score, FPR
  - Latency (mean, P50, P95, P99)
  - Privacy budget (ε, δ)
- Visual pass/fail indicators

## Implementation Components

| Component | Status |
|-----------|--------|
| VAE (Anomaly Detection) | ✓ Implemented |
| HNSW Cache (Signature Matching) | ✓ Implemented |
| DDQN (Response Selection) | ✓ Implemented |
| Federated Learning | ✓ Implemented |
| Byzantine-Robust Krum | ✓ Implemented |
| Differential Privacy | ✓ Implemented |

## Files

- `app.py` - Flask web UI
- `run_framework.py` - Core framework implementation
- `validate_results.py` - Validation script
- `main.tex` - Manuscript

## Requirements

```bash
pip install flask torch numpy
```