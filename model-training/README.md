
# **DeshiPlate AI — Model Training Module**

This folder contains the complete training pipeline used to fine-tune a **NextViT** model on a custom dataset of **33 Bangladeshi food categories**.

The final trained model is uploaded to **Hugging Face Hub** and is used by the public DeshiPlate AI application.

---

## 🎯 **Overview**

### Model: **NextViT (Next Vision Transformer)**

### Dataset: **33 Bangladeshi Food Classes**

Includes foods such as:

* Biriyani, Cake, Cha, Chicken Curry, Chicken Wings
* Chocolate Cake, Chow Mein, Crab Dish (Kakra), Doi, Fish Bhuna
* French Fries, Fried Fish (Mach Bhaja), Fried Rice, Khichuri, Misti
* Momos, Meat Curry (Gosht Bhuna), Salad, Sandwich, Shik Kabab
* Singara, Bakorkhani, Cheesecake, Cupcakes, Fuchka
* Haleem, Ice Cream, Jilapi, Nehari, Pakora
* Pizza, Poached Egg, Porota

### Outputs:

* Food label prediction
* Confidence score

The model is trained to generalize well on real-world food photos taken in homes, restaurants, and online sources.

---

## 📁 **Folder Structure**

```
model-training/
│
├── main.py              # Main training script
├── datasets.py          # Dataset class, transforms, augmentations
├── engine.py            # Training + validation loops
├── losses.py            # Loss function definitions
├── nextvit.py           # NextViT architecture implementation
├── samplers.py          # Data samplers for training
├── utils.py             # Helper utilities (metrics, checkpointing)
├── train.sh             # Shell script to start training
└── __init__.py          # Init file
```

---

## 🧠 **Training Pipeline**

### 1. **Data Loading**

`datasets.py` loads images, applies augmentations, and prepares:

* Train split
* Validation split

### 2. **Model Architecture**

`nextvit.py` contains the implementation of NextViT.

### 3. **Training Loop**

Managed by `engine.py`, including:

* Forward pass
* Backpropagation
* Metrics
* Logging

### 4. **Checkpoint Saving**

Automatic saving of:

* Best accuracy
* Latest checkpoint

### 5. **Evaluation**

Final accuracy and loss metrics logged during validation.

---

## 🚀 **Run Training**

You can start training by running the following command:

```bash
!python main.py \
    --model nextvit_small \
    --data-set FOOD \
    --data-path /content/food_dataset/images \
    --train-csv /content/food_dataset/train.csv \
    --val-csv /content/food_dataset/test.csv \
    --batch-size 32 \
    --epochs 100 \
    --lr 5e-4 \
    --output-dir ./output
```

Or use the shell script to start the training:

```bash
bash train.sh
```

### Arguments:

* `--model`: Specifies the model architecture, e.g., `nextvit_small`
* `--data-set`: Specifies the dataset, e.g., `FOOD`
* `--data-path`: Path to the folder containing food images.
* `--train-csv`: Path to the CSV file with training data.
* `--val-csv`: Path to the CSV file with validation data.
* `--batch-size`: Batch size for training.
* `--epochs`: Number of epochs to train the model.
* `--lr`: Learning rate.
* `--output-dir`: Directory to save the training output, logs, and checkpoints.

---

## 📜 **License**

This module is covered under the MIT License.

---

## Additional Notes:

* Make sure your environment has the necessary dependencies installed, including PyTorch, torchvision, and any specific libraries required by **NextViT**.
* If you run into memory issues, consider reducing the batch size or using mixed precision training.
