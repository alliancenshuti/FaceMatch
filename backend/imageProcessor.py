import os
from deepface import DeepFace
from tqdm import tqdm
import pandas as pd
import matplotlib

matplotlib.use('TkAgg')
import matplotlib.pyplot as plt

characters = []
target_img_name = 'images/person2/p7.jpeg'
for dirpath, dirname, filenames in os.walk('images/'):
    for filename in filenames:
        if '.jpeg' in filename:
            characters.append(dirpath + '/' + filename)

similarities = {}
for character in tqdm(characters):
    obj = DeepFace.verify(img1_path=character, img2_path=target_img_name, model_name='Facenet',
                          detector_backend='mtcnn', distance_metric='euclidean')
    similarities[character] = obj["distance"]

try:
    df = pd.DataFrame(similarities.items(), columns=['character', 'distance'])
    df = df.sort_values(by=['distance'])

    img_name = df.iloc[0]["character"]
    img = DeepFace.detectFace(img_path=img_name, detector_backend='mtcnn')

    target_img = DeepFace.detectFace(img_path=target_img_name, detector_backend='mtcnn')

    fig = plt.figure(figsize=(10, 10))
    ax1 = fig.add_subplot(1, 2, 1)

    plt.imshow(img)
    plt.axis('off')

    ax2 = fig.add_subplot(1, 2, 2)
    plt.imshow(target_img)
    plt.axis('off')

    plt.show()

    print(df.iloc[[0]]["distance"])
except IndexError:
    pass
