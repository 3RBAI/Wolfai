#!/bin/bash

# ======================================================
# 🐺 Wolf AI - سكربت تدريب نموذج الذكاء الاصطناعي المتطور
# ======================================================
# المؤلف: WOLF-AI
# الإصدار: 1.0.0
# ======================================================

# ألوان للعرض
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
GOLD='\033[0;33m'
NC='\033[0m' # No Color

# تعريف المتغيرات الرئيسية
WOLF_VERSION="1.0.0"
BASE_MODEL="meta-llama/Llama-3-70b"
WOLF_MODEL_NAME="wolf-ai-crown-${WOLF_VERSION}"
TRAINING_DIR="$HOME/wolf_ai_training"
DATASETS_DIR="$TRAINING_DIR/datasets"
MODELS_DIR="$TRAINING_DIR/models"
CHECKPOINTS_DIR="$TRAINING_DIR/checkpoints"
LOGS_DIR="$TRAINING_DIR/logs"
OUTPUT_DIR="$TRAINING_DIR/output"
MINDMAP_TEMPLATES="$TRAINING_DIR/mindmap_templates"
API_KEYS_DIR="$TRAINING_DIR/api_keys"
CONFIG_FILE="$TRAINING_DIR/wolf_config.json"
CUDA_VISIBLE_DEVICES="0,1,2,3" # تعديل حسب عدد بطاقات GPU المتوفرة

# إنشاء بنية المجلدات
setup_directories() {
    echo -e "${BLUE}[*] إنشاء بنية المجلدات للتدريب...${NC}"
    mkdir -p $DATASETS_DIR/{philosophy,poetry,programming,technical,frontend,mindmaps}
    mkdir -p $MODELS_DIR
    mkdir -p $CHECKPOINTS_DIR
    mkdir -p $LOGS_DIR
    mkdir -p $OUTPUT_DIR
    mkdir -p $MINDMAP_TEMPLATES
    mkdir -p $API_KEYS_DIR
    echo -e "${GREEN}[+] تم إنشاء بنية المجلدات بنجاح${NC}"
}

# تثبيت المتطلبات الأساسية
install_dependencies() {
    echo -e "${BLUE}[*] تثبيت المتطلبات الأساسية...${NC}"
    
    # تحديث النظام
    apt update && apt upgrade -y
    
    # تثبيت المتطلبات الأساسية
    apt install -y build-essential python3-dev python3-pip git wget curl libopenmpi-dev
    apt install -y nvidia-cuda-toolkit nvidia-cuda-toolkit-gcc
    
    # تثبيت حزم Python
    pip3 install --upgrade pip
    pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121
    pip3 install transformers datasets accelerate peft bitsandbytes sentencepiece
    pip3 install deepspeed optimum flash-attn
    pip3 install wandb tensorboard matplotlib networkx pydot graphviz
    pip3 install huggingface_hub gradio flask fastapi uvicorn
    
    # تثبيت أدوات تحليل البيانات
    pip3 install pandas numpy scipy scikit-learn nltk spacy
    python3 -m spacy download ar_core_news_lg
    python3 -m spacy download en_core_web_trf
    
    echo -e "${GREEN}[+] تم تثبيت جميع المتطلبات بنجاح${NC}"
}

# تنزيل مجموعات البيانات المتخصصة
download_datasets() {
    echo -e "${BLUE}[*] تنزيل وإعداد مجموعات البيانات المتخصصة...${NC}"
    
    # الفلسفة والشعر
    echo -e "${YELLOW}[*] تنزيل بيانات الفلسفة والشعر العربي والعالمي...${NC}"
    git clone https://github.com/OpenArabic/1000AH.git $DATASETS_DIR/philosophy/arabic_philosophy
    git clone https://github.com/OpenITI/OpenITI.git $DATASETS_DIR/philosophy/openiti
    wget -P $DATASETS_DIR/poetry https://archive.org/download/PoetryFoundationData/PoetryFoundationData.zip
    unzip $DATASETS_DIR/poetry/PoetryFoundationData.zip -d $DATASETS_DIR/poetry/
    
    # البرمجة والتقنية
    echo -e "${YELLOW}[*] تنزيل بيانات البرمجة والتقنية...${NC}"
    git clone https://github.com/facebookresearch/CodeLlama.git $DATASETS_DIR/programming/code_llama
    git clone https://github.com/github/CodeSearchNet.git $DATASETS_DIR/programming/code_search_net
    git clone https://github.com/TheAlgorithms/Python.git $DATASETS_DIR/programming/algorithms_python
    git clone https://github.com/TheAlgorithms/JavaScript.git $DATASETS_DIR/programming/algorithms_js
    git clone https://github.com/kamranahmedse/developer-roadmap.git $DATASETS_DIR/programming/developer_roadmap
    
    # واجهات المستخدم والتصميم
    echo -e "${YELLOW}[*] تنزيل بيانات واجهات المستخدم والتصميم...${NC}"
    git clone https://github.com/vercel/next.js.git $DATASETS_DIR/frontend/nextjs
    git clone https://github.com/facebook/react.git $DATASETS_DIR/frontend/react
    git clone https://github.com/tailwindlabs/tailwindcss.git $DATASETS_DIR/frontend/tailwindcss
    git clone https://github.com/shadcn-ui/ui.git $DATASETS_DIR/frontend/shadcn
    
    # الخرائط الذهنية
    echo -e "${YELLOW}[*] تنزيل قوالب الخرائط الذهنية...${NC}"
    git clone https://github.com/markmap/markmap.git $DATASETS_DIR/mindmaps/markmap
    
    # تنزيل مجموعات بيانات إضافية من Hugging Face
    echo -e "${YELLOW}[*] تنزيل مجموعات بيانات من Hugging Face...${NC}"
    python3 -c "
from datasets import load_dataset
from huggingface_hub import login

# يمكنك إضافة رمز الوصول الخاص بك هنا إذا كنت تريد الوصول إلى مجموعات بيانات خاصة
# login('your_huggingface_token')

# تنزيل مجموعات بيانات متنوعة
datasets = [
    ('allenai/c4', 'ar'),
    ('allenai/c4', 'en'),
    ('Abirate/arabic_poetry', 'default'),
    ('wikimedia/wikipedia', 'arwiki'),
    ('togethercomputer/RedPajama-Data-1T', 'default'),
    ('bigcode/the-stack', 'data'),
    ('HuggingFaceH4/stack-exchange-preferences', 'default')
]

for dataset_name, subset in datasets:
    try:
        print(f'تنزيل {dataset_name} ({subset})...')
        if subset == 'default':
            dataset = load_dataset(dataset_name, split='train')
        else:
            dataset = load_dataset(dataset_name, subset, split='train')
        print(f'تم تنزيل {len(dataset)} عنصر من {dataset_name}')
        # حفظ عينة صغيرة للتحقق
        sample = dataset.shuffle().select(range(min(100, len(dataset))))
        sample.save_to_disk(f'$DATASETS_DIR/{dataset_name.split('/')[-1]}_{subset}_sample')
    except Exception as e:
        print(f'خطأ في تنزيل {dataset_name}: {e}')
"
    
    echo -e "${GREEN}[+] تم تنزيل وإعداد مجموعات البيانات بنجاح${NC}"
}

# معالجة وتحضير البيانات
prepare_data() {
    echo -e "${BLUE}[*] معالجة وتحضير البيانات للتدريب...${NC}"
    
    # إنشاء سكربت معالجة البيانات
    cat > $TRAINING_DIR/prepare_data.py << 'EOL'
import os
import json
import random
import re
import pandas as pd
import numpy as np
from datasets import load_dataset, Dataset, DatasetDict
from transformers import AutoTokenizer

# تهيئة المعالج اللغوي
tokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-3-70b")

# تحديد المسارات
base_dir = os.environ.get("TRAINING_DIR")
datasets_dir = os.path.join(base_dir, "datasets")
output_dir = os.path.join(base_dir, "output")

# إنشاء قوالب للتعليمات
instruction_templates = {
    "philosophy": [
        "فكر كفيلسوف وأجب على السؤال التالي: {question}",
        "ناقش المفهوم الفلسفي التالي من وجهة نظر {philosopher}: {concept}",
        "قارن بين وجهات النظر الفلسفية لـ {philosopher1} و {philosopher2} حول {topic}",
    ],
    "poetry": [
        "اكتب قصيدة عن {topic} بأسلوب {style}",
        "أكمل القصيدة التالية بنفس الأسلوب: {poem_start}",
        "اكتب قصيدة تعبر عن {emotion} باستخدام استعارات من {domain}",
    ],
    "programming": [
        "اكتب كود {language} لـ {task}",
        "اشرح كيف يعمل الخوارزمية التالية: {algorithm}",
        "حسّن الكود التالي من حيث {aspect}: {code}",
        "قم بتصحيح الأخطاء في الكود التالي: {code}",
    ],
    "technical": [
        "اشرح بالتفصيل كيف يعمل {technology}",
        "قارن بين {tech1} و {tech2} من حيث {aspects}",
        "اكتب توثيقًا تقنيًا لـ {api_name} يشرح {functionality}",
    ],
    "frontend": [
        "صمم واجهة مستخدم لـ {website_type} باستخدام {framework}",
        "اكتب كود HTML و CSS و JavaScript لإنشاء {component}",
        "اشرح كيفية تحسين أداء تطبيق {framework} من خلال {technique}",
    ],
    "mindmap": [
        "أنشئ خريطة ذهنية توضح العلاقات بين {concepts}",
        "قم بتنظيم المعلومات التالية في خريطة ذهنية: {information}",
        "صمم خريطة ذهنية لشرح {topic} بطريقة مبسطة",
    ]
}

# إنشاء أمثلة للتدريب
def create_training_examples(category, num_examples=1000):
    templates = instruction_templates[category]
    examples = []
    
    # قواميس للاستبدال حسب الفئة
    replacements = {
        "philosophy": {
            "question": ["ما هي الحقيقة؟", "ما معنى الوجود؟", "كيف نعرف ما نعرفه؟", "ما هي العدالة؟"],
            "philosopher": ["أرسطو", "كانط", "نيتشه", "ابن رشد", "الفارابي", "ابن سينا", "ديكارت"],
            "concept": ["الوجودية", "المثالية", "المادية", "الحتمية", "الحرية", "الأخلاق"],
            "topic": ["الأخلاق", "المعرفة", "الوجود", "الجمال", "العدالة", "الحقيقة"]
        },
        "poetry": {
            "topic": ["الحب", "الطبيعة", "الحياة", "الموت", "الحرية", "الوطن", "الغربة"],
            "style": ["كلاسيكي", "حر", "حديث", "رومانسي", "صوفي", "ملحمي"],
            "poem_start": ["على قمم الجبال تسكن الأحلام", "في ليلٍ طويل والنجوم تلمع", "سألتُ البحر عن سر الحياة"],
            "emotion": ["الفرح", "الحزن", "الشوق", "الغضب", "الأمل", "اليأس"],
            "domain": ["الطبيعة", "الفضاء", "البحر", "الصحراء", "المدينة", "التاريخ"]
        },
        "programming": {
            "language": ["Python", "JavaScript", "TypeScript", "Rust", "Go", "C++", "Java"],
            "task": ["تصنيف البيانات", "معالجة النصوص", "تحليل الصور", "إنشاء واجهة مستخدم", "بناء API"],
            "algorithm": ["البحث الثنائي", "الفرز السريع", "خوارزمية ديكسترا", "الشبكات العصبية", "التعلم العميق"],
            "aspect": ["الأداء", "قابلية القراءة", "الأمان", "قابلية التوسع"],
            "code": ["def fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)"]
        },
        "technical": {
            "technology": ["الشبكات العصبية", "blockchain", "الحوسبة السحابية", "إنترنت الأشياء", "الذكاء الاصطناعي"],
            "tech1": ["React", "Angular", "TensorFlow", "PyTorch", "Docker", "Kubernetes"],
            "tech2": ["Vue", "Svelte", "Keras", "JAX", "Podman", "Nomad"],
            "aspects": ["الأداء", "سهولة الاستخدام", "المجتمع", "التوثيق", "الأمان"],
            "api_name": ["REST API", "GraphQL", "gRPC", "WebSocket", "WebRTC"],
            "functionality": ["المصادقة", "معالجة البيانات", "التخزين", "التحليلات", "المراقبة"]
        },
        "frontend": {
            "website_type": ["متجر إلكتروني", "منصة تعليمية", "شبكة اجتماعية", "لوحة تحكم", "موقع أخبار"],
            "framework": ["React", "Vue", "Angular", "Svelte", "Next.js", "Nuxt.js"],
            "component": ["قائمة منسدلة", "نموذج تسجيل", "شريط تنقل", "بطاقة منتج", "مخطط بياني"],
            "technique": ["تقسيم الكود", "التخزين المؤقت", "التحميل المتأخر", "SSR", "تحسين الصور"]
        },
        "mindmap": {
            "concepts": ["الذكاء الاصطناعي", "علم البيانات", "تطوير الويب", "الأمن السيبراني", "الفلسفة"],
            "information": ["مفاهيم البرمجة الأساسية", "تاريخ الفلسفة", "تقنيات الذكاء الاصطناعي", "مكونات الحاسوب"],
            "topic": ["الشبكات العصبية", "تطوير الويب", "قواعد البيانات", "الخوارزميات", "الأمن السيبراني"]
        }
    }
    
    for _ in range(num_examples):
        template = random.choice(templates)
        filled_template = template
        
        # استبدال المتغيرات في القالب
        for key, values in replacements[category].items():
            pattern = "{" + key + "}"
            if pattern in filled_template:
                replacement = random.choice(values)
                filled_template = filled_template.replace(pattern, replacement)
        
        # إنشاء استجابة وهمية (سيتم استبدالها بالبيانات الحقيقية لاحقًا)
        response = f"هذه استجابة نموذجية لـ: {filled_template}"
        
        examples.append({
            "instruction": filled_template,
            "response": response,
            "category": category
        })
    
    return examples

# دمج البيانات من مصادر مختلفة
def merge_datasets():
    all_examples = []
    
    # إنشاء أمثلة لكل فئة
    for category in instruction_templates.keys():
        examples = create_training_examples(category, num_examples=5000)
        all_examples.extend(examples)
    
    # خلط البيانات
    random.shuffle(all_examples)
    
    # تقسيم البيانات إلى تدريب وتحقق واختبار
    train_size = int(0.8 * len(all_examples))
    val_size = int(0.1 * len(all_examples))
    
    train_examples = all_examples[:train_size]
    val_examples = all_examples[train_size:train_size+val_size]
    test_examples = all_examples[train_size+val_size:]
    
    # إنشاء مجموعات البيانات
    train_dataset = Dataset.from_pandas(pd.DataFrame(train_examples))
    val_dataset = Dataset.from_pandas(pd.DataFrame(val_examples))
    test_dataset = Dataset.from_pandas(pd.DataFrame(test_examples))
    
    # إنشاء DatasetDict
    dataset_dict = DatasetDict({
        'train': train_dataset,
        'validation': val_dataset,
        'test': test_dataset
    })
    
    # حفظ مجموعة البيانات
    dataset_dict.save_to_disk(os.path.join(output_dir, "wolf_ai_dataset"))
    
    print(f"تم إنشاء مجموعة بيانات بـ {len(train_examples)} مثال تدريب، {len(val_examples)} مثال تحقق، و {len(test_examples)} مثال اختبار")
    
    return dataset_dict

# تنفيذ الدالة الرئيسية
if __name__ == "__main__":
    print("بدء معالجة البيانات...")
    dataset = merge_datasets()
    print("اكتملت معالجة البيانات بنجاح!")
EOL
    
    # تنفيذ سكربت معالجة البيانات
    echo -e "${YELLOW}[*] تنفيذ معالجة البيانات...${NC}"
    export TRAINING_DIR=$TRAINING_DIR
    python3 $TRAINING_DIR/prepare_data.py
    
    echo -e "${GREEN}[+] تم معالجة وتحضير البيانات بنجاح${NC}"
}

# إنشاء قوالب الخرائط الذهنية
create_mindmap_templates() {
    echo -e "${BLUE}[*] إنشاء قوالب الخرائط الذهنية...${NC}"
    
    # إنشاء سكربت لتوليد قوالب الخرائط الذهنية
    cat > $TRAINING_DIR/create_mindmap_templates.py << 'EOL'
import os
import json
import random
import networkx as nx
import matplotlib.pyplot as plt
from matplotlib.colors import LinearSegmentedColormap
import numpy as np

# تحديد المسارات
base_dir = os.environ.get("TRAINING_DIR")
mindmap_dir = os.path.join(base_dir, "mindmap_templates")

# إنشاء ألوان متدرجة للخرائط الذهنية
colors = ["#D4AF37", "#8A2BE2", "#2D8CFF", "#FF4500", "#32CD32"]
cmap = LinearSegmentedColormap.from_list("wolf_colors", colors, N=100)

# إنشاء قوالب للخرائط الذهنية
def create_mindmap_template(template_name, num_nodes=20, max_depth=3):
    # إنشاء رسم بياني موجه
    G = nx.DiGraph()
    
    # إضافة العقدة الجذر
    G.add_node(0, label=template_name, depth=0)
    
    # إضافة العقد والحواف
    current_node_id = 1
    for depth in range(1, max_depth + 1):
        # عدد العقد في هذا المستوى
        nodes_at_this_level = random.randint(2, 5) if depth == 1 else random.randint(1, 3)
        
        # العقد الأم المحتملة (من المستوى السابق)
        potential_parents = [n for n, d in G.nodes(data=True) if d['depth'] == depth - 1]
        
        for _ in range(nodes_at_this_level * len(potential_parents)):
            parent = random.choice(potential_parents)
            G.add_node(current_node_id, label=f"Node {current_node_id}", depth=depth)
            G.add_edge(parent, current_node_id)
            current_node_id += 1
    
    # حفظ الرسم البياني كملف JSON
    graph_data = {
        "nodes": [{"id": n, "label": G.nodes[n]["label"], "depth": G.nodes[n]["depth"]} for n in G.nodes()],
        "edges": [{"source": u, "target": v} for u, v in G.edges()]
    }
    
    with open(os.path.join(mindmap_dir, f"{template_name}.json"), "w", encoding="utf-8") as f:
        json.dump(graph_data, f, ensure_ascii=False, indent=2)
    
    # رسم وحفظ الخريطة الذهنية كصورة
    plt.figure(figsize=(12, 8))
    pos = nx.nx_agraph.graphviz_layout(G, prog="twopi", root=0)
    
    # رسم العقد بألوان مختلفة حسب العمق
    max_depth_val = max(nx.get_node_attributes(G, 'depth').values())
    node_colors = [cmap(G.nodes[n]['depth'] / max_depth_val) for n in G.nodes()]
    
    nx.draw(G, pos, with_labels=True, labels=nx.get_node_attributes(G, 'label'),
            node_color=node_colors, node_size=1500, font_size=10, font_weight='bold',
            edge_color='gray', width=1.5, alpha=0.8, arrows=True)
    
    plt.title(f"Wolf AI Mindmap Template: {template_name}", fontsize=16)
    plt.tight_layout()
    plt.savefig(os.path.join(mindmap_dir, f"{template_name}.png"), dpi=300, bbox_inches='tight')
    plt.close()
    
    return graph_data

# إنشاء قوالب متنوعة
template_topics = [
    "التفكير الفلسفي",
    "تحليل الشعر",
    "هيكل البرمجة",
    "تصميم الواجهات",
    "تحليل البيانات",
    "الخوارزميات المتقدمة",
    "الشبكات العصبية",
    "معالجة اللغة الطبيعية",
    "الرؤية الحاسوبية",
    "التعلم المعزز"
]

# إنشاء القوالب
for topic in template_topics:
    print(f"إنشاء قالب للخريطة الذهنية: {topic}")
    create_mindmap_template(topic, num_nodes=random.randint(15, 30), max_depth=random.randint(3, 5))

print(f"تم إنشاء {len(template_topics)} قالب للخرائط الذهنية")
EOL
    
    # تنفيذ سكربت إنشاء قوالب الخرائط الذهنية
    echo -e "${YELLOW}[*] إنشاء قوالب الخرائط الذهنية...${NC}"
    export TRAINING_DIR=$TRAINING_DIR
    python3 $TRAINING_DIR/create_mindmap_templates.py
    
    echo -e "${GREEN}[+] تم إنشاء قوالب الخرائط الذهنية بنجاح${NC}"
}

# تنزيل النموذج الأساسي
download_base_model() {
    echo -e "${BLUE}[*] تنزيل النموذج الأساسي...${NC}"
    
    # إنشاء سكربت لتنزيل النموذج
    cat > $TRAINING_DIR/download_model.py << 'EOL'
from huggingface_hub import snapshot_download
import os

# تحديد المسارات
base_dir = os.environ.get("TRAINING_DIR")
models_dir = os.path.join(base_dir, "models")
model_name = os.environ.get("BASE_MODEL")

# تنزيل النموذج
print(f"تنزيل النموذج: {model_name}")
model_path = snapshot_download(
    repo_id=model_name,
    local_dir=os.path.join(models_dir, model_name.split("/")[-1]),
    ignore_patterns=["*.safetensors", "*.bin"] if os.environ.get("QUANTIZE") == "true" else None
)

print(f"تم تنزيل النموذج إلى: {model_path}")
EOL
    
    # تنفيذ سكربت تنزيل النموذج
    echo -e "${YELLOW}[*] تنزيل النموذج الأساسي ${BASE_MODEL}...${NC}"
    export TRAINING_DIR=$TRAINING_DIR
    export BASE_MODEL=$BASE_MODEL
    export QUANTIZE="true"  # تعيين لـ true للتنزيل السريع (بدون الملفات الكبيرة)
    python3 $TRAINING_DIR/download_model.py
    
    echo -e "${GREEN}[+] تم تنزيل النموذج الأساسي بنجاح${NC}"
}

# تحسين النموذج باستخدام QLoRA
finetune_model() {
    echo -e "${BLUE}[*] بدء عملية تحسين النموذج باستخدام QLoRA...${NC}"
    
    # إنشاء ملف التكوين للتدريب
    cat > $CONFIG_FILE << EOL
{
    "base_model": "${BASE_MODEL}",
    "model_name": "${WOLF_MODEL_NAME}",
    "dataset_path": "${OUTPUT_DIR}/wolf_ai_dataset",
    "output_dir": "${MODELS_DIR}/${WOLF_MODEL_NAME}",
    "checkpoints_dir": "${CHECKPOINTS_DIR}",
    "training_params": {
        "num_train_epochs": 3,
        "per_device_train_batch_size": 4,
        "per_device_eval_batch_size": 4,
        "gradient_accumulation_steps": 8,
        "learning_rate": 2e-5,
        "weight_decay": 0.01,
        "warmup_ratio": 0.03,
        "max_grad_norm": 0.3,
        "lora_r": 64,
        "lora_alpha": 16,
        "lora_dropout": 0.1,
        "max_seq_length": 2048,
        "fp16": true
    }
}
EOL
    
    # إنشاء سكربت التدريب
    cat > $TRAINING_DIR/finetune_model.py << 'EOL'
import os
import json
import torch
from datasets import load_from_disk
from transformers import (
    AutoModelForCausalLM,
    AutoTokenizer,
    BitsAndBytesConfig,
    TrainingArguments,
    Trainer,
    DataCollatorForLanguageModeling
)
from peft import (
    prepare_model_for_kbit_training,
    LoraConfig,
    get_peft_model,
    TaskType
)
import wandb

# تحديد المسارات
config_file = os.environ.get("CONFIG_FILE")
with open(config_file, "r") as f:
    config = json.load(f)

# تهيئة wandb للتتبع
wandb.init(project="wolf-ai-training", name=config["model_name"])

# تكوين BitsAndBytes للتدريب بدقة منخفضة
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_use_double_quant=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.float16
)

# تحميل النموذج والمعالج اللغوي
print(f"تحميل النموذج الأساسي: {config['base_model']}")
model = AutoModelForCausalLM.from_pretrained(
    config["base_model"],
    quantization_config=bnb_config,
    device_map="auto",
    trust_remote_code=True
)
tokenizer = AutoTokenizer.from_pretrained(config["base_model"], trust_remote_code=True)

# إعداد النموذج للتدريب
model = prepare_model_for_kbit_training(model)

# تكوين LoRA
lora_config = LoraConfig(
    r=config["training_params"]["lora_r"],
    lora_alpha=config["training_params"]["lora_alpha"],
    lora_dropout=config["training_params"]["lora_dropout"],
    bias="none",
    task_type=TaskType.CAUSAL_LM,
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj", "gate_proj", "up_proj", "down_proj"]
)

# تطبيق LoRA على النموذج
model = get_peft_model(model, lora_config)

# تحميل مجموعة البيانات
print(f"تحميل مجموعة البيانات من: {config['dataset_path']}")
dataset = load_from_disk(config["dataset_path"])

# تحضير البيانات للتدريب
def preprocess_function(examples):
    # تنسيق البيانات للتدريب
    prompts = []
    for instruction, response in zip(examples["instruction"], examples["response"]):
        prompt = f"### تعليمات:\n{instruction}\n\n### استجابة:\n{response}"
        prompts.append(prompt)
    
    # ترميز النصوص
    tokenized = tokenizer(
        prompts,
        truncation=True,
        max_length=config["training_params"]["max_seq_length"],
        padding="max_length"
    )
    
    return tokenized

# معالجة البيانات
tokenized_datasets = dataset.map(
    preprocess_function,
    batched=True,
    remove_columns=["instruction", "response", "category"]
)

# إعداد معامِل البيانات
data_collator = DataCollatorForLanguageModeling(tokenizer=tokenizer, mlm=False)

# إعداد معاملات التدريب
training_args = TrainingArguments(
    output_dir=config["output_dir"],
    num_train_epochs=config["training_params"]["num_train_epochs"],
    per_device_train_batch_size=config["training_params"]["per_device_train_batch_size"],
    per_device_eval_batch_size=config["training_params"]["per_device_eval_batch_size"],
    gradient_accumulation_steps=config["training_params"]["gradient_accumulation_steps"],
    learning_rate=config["training_params"]["learning_rate"],
    weight_decay=config["training_params"]["weight_decay"],
    warmup_ratio=config["training_params"]["warmup_ratio"],
    max_grad_norm=config["training_params"]["max_grad_norm"],
    fp16=config["training_params"]["fp16"],
    logging_steps=10,
    save_steps=100,
    eval_steps=100,
    save_total_limit=3,
    evaluation_strategy="steps",
    load_best_model_at_end=True,
    report_to="wandb",
    save_safetensors=True,
    lr_scheduler_type="cosine",
    seed=42
)

# إنشاء المدرب
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_datasets["train"],
    eval_dataset=tokenized_datasets["validation"],
    data_collator=data_collator,
)

# بدء التدريب
print("بدء التدريب...")
trainer.train()

# حفظ النموذج المدرب
print(f"حفظ النموذج المدرب في: {config['output_dir']}")
trainer.save_model(config["output_dir"])
tokenizer.save_pretrained(config["output_dir"])

# حفظ تكوين النموذج
with open(os.path.join(config["output_dir"], "wolf_config.json"), "w") as f:
    json.dump(config, f, indent=2)

print("اكتمل التدريب بنجاح!")
EOL
    
    # تنفيذ سكربت التدريب
    echo -e "${YELLOW}[*] بدء تدريب النموذج...${NC}"
    export CONFIG_FILE=$CONFIG_FILE
    export CUDA_VISIBLE_DEVICES=$CUDA_VISIBLE_DEVICES
    python3 $TRAINING_DIR/finetune_model.py
    
    echo -e "${GREEN}[+] تم تدريب النموذج بنجاح${NC}"
}

# تحسين قدرات الخرائط الذهنية
enhance_mindmap_capabilities() {
    echo -e "${BLUE}[*] تحسين قدرات الخرائط الذهنية...${NC}"
    
    # إنشاء سكربت لتدريب النموذج على إنشاء الخرائط الذهنية
    cat > $TRAINING_DIR/enhance_mindmap.py << 'EOL'
import os
import json
import torch
import random
from datasets import Dataset, load_from_disk
from transformers import (
    AutoModelForCausalLM,
    AutoTokenizer,
    TrainingArguments,
    Trainer,
    DataCollatorForLanguageModeling
)
from peft import PeftModel, PeftConfig

# تحديد المسارات
config_file = os.environ.get("CONFIG_FILE")
with open(config_file, "r") as f:
    config = json.load(f)

# تحميل قوالب الخرائط الذهنية
mindmap_dir = os.path.join(os.environ.get("TRAINING_DIR"), "mindmap_templates")
mindmap_templates = []
for filename in os.listdir(mindmap_dir):
    if filename.endswith(".json"):
        with open(os.path.join(mindmap_dir, filename), "r") as f:
            template = json.load(f)
            template["name"] = filename.replace(".json", "")
            mindmap_templates.append(template)

# إنشاء أمثلة تدريب للخرائط الذهنية
def create_mindmap_examples(num_examples=500):
    examples = []
    
    topics = [
        "الذكاء الاصطناعي", "البرمجة", "الفلسفة", "الشعر", "تطوير الويب",
        "الشبكات العصبية", "التعلم العميق", "معالجة اللغة الطبيعية",
        "الرؤية الحاسوبية", "التعلم المعزز", "الأمن السيبراني",
        "قواعد البيانات", "الخوارزميات", "هندسة البرمجيات"
    ]
    
    for _ in range(num_examples):
        topic = random.choice(topics)
        template = random.choice(mindmap_templates)
        
        # إنشاء تمثيل نصي للخريطة الذهنية
        mindmap_text = f"# خريطة ذهنية: {topic}\n\n"
        
        # إضافة العقد حسب العمق
        nodes_by_depth = {}
        for node in template["nodes"]:
            depth = node["depth"]
            if depth not in nodes_by_depth:
                nodes_by_depth[depth] = []
            nodes_by_depth[depth].append(node)
        
        # بناء الخريطة الذهنية النصية
        for depth in sorted(nodes_by_depth.keys()):
            for node in nodes_by_depth[depth]:
                indent = "  " * depth
                node_label = f"{topic} - {node['label']}" if depth == 0 else f"فرع {node['id']}: {node['label']}"
                mindmap_text += f"{indent}- {node_label}\n"
        
        # إنشاء التعليمات والاستجابة
        instruction = f"أنشئ خريطة ذهنية لشرح {topic} بطريقة منظمة ومترابطة."
        response = f"فيما يلي خريطة ذهنية لشرح {topic}:\n\n```mindmap\n{mindmap_text}\n```"
        
        examples.append({
            "instruction": instruction,
            "response": response,
            "category": "mindmap"
        })
    
    return examples

# إنشاء مجموعة بيانات للخرائط الذهنية
mindmap_examples = create_mindmap_examples(num_examples=1000)
mindmap_dataset = Dataset.from_pandas(pd.DataFrame(mindmap_examples))

# تحميل النموذج المدرب
model_path = config["output_dir"]
print(f"تحميل النموذج المدرب من: {model_path}")

# تحميل التكوين والنموذج
peft_config = PeftConfig.from_pretrained(model_path)
tokenizer = AutoTokenizer.from_pretrained(peft_config.base_model_name_or_path)
model = AutoModelForCausalLM.from_pretrained(
    peft_config.base_model_name_or_path,
    device_map="auto",
    torch_dtype=torch.float16
)
model = PeftModel.from_pretrained(model, model_path)

# تحضير البيانات للتدريب
def preprocess_function(examples):
    prompts = []
    for instruction, response in zip(examples["instruction"], examples["response"]):
        prompt = f"### تعليمات:\n{instruction}\n\n### استجابة:\n{response}"
        prompts.append(prompt)
    
    tokenized = tokenizer(
        prompts,
        truncation=True,
        max_length=config["training_params"]["max_seq_length"],
        padding="max_length"
    )
    
    return tokenized

# معالجة البيانات
tokenized_dataset = mindmap_dataset.map(
    preprocess_function,
    batched=True,
    remove_columns=["instruction", "response", "category"]
)

# إعداد معامِل البيانات
data_collator = DataCollatorForLanguageModeling(tokenizer=tokenizer, mlm=False)

# إعداد معاملات التدريب
training_args = TrainingArguments(
    output_dir=os.path.join(config["output_dir"], "mindmap_enhanced"),
    num_train_epochs=2,
    per_device_train_batch_size=config["training_params"]["per_device_train_batch_size"],
    learning_rate=1e-5,
    weight_decay=0.01,
    warmup_ratio=0.03,
    fp16=True,
    logging_steps=10,
    save_steps=100,
    save_total_limit=2,
    report_to="none",
    save_safetensors=True
)

# إنشاء المدرب
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_dataset,
    data_collator=data_collator,
)

# بدء التدريب
print("بدء تدريب تحسين الخرائط الذهنية...")
trainer.train()

# حفظ النموذج المحسن
print(f"حفظ النموذج المحسن في: {os.path.join(config['output_dir'], 'mindmap_enhanced')}")
trainer.save_model(os.path.join(config["output_dir"], "mindmap_enhanced"))

print("اكتمل تحسين قدرات الخرائط الذهنية بنجاح!")
EOL
    
    # تنفيذ سكربت تحسين الخرائط الذهنية
    echo -e "${YELLOW}[*] تحسين قدرات الخرائط الذهنية...${NC}"
    export CONFIG_FILE=$CONFIG_FILE
    export TRAINING_DIR=$TRAINING_DIR
    python3 $TRAINING_DIR/enhance_mindmap.py
    
    echo -e "${GREEN}[+] تم تحسين قدرات الخرائط الذهنية بنجاح${NC}"
}

# تقييم أداء النموذج
evaluate_model() {
    echo -e "${BLUE}[*] تقييم أداء النموذج...${NC}"
    
    # إنشاء سكربت التقييم
    cat > $TRAINING_DIR/evaluate_model.py << 'EOL'
import os
import json
import torch
import pandas as pd
import numpy as np
from datasets import load_from_disk
from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import PeftModel, PeftConfig
from tqdm import tqdm

# تحديد المسارات
config_file = os.environ.get("CONFIG_FILE")
with open(config_file, "r") as f:
    config = json.load(f)

# تحميل النموذج المدرب
model_path = config["output_dir"]
print(f"تحميل النموذج المدرب من: {model_path}")

# تحميل التكوين والنموذج
peft_config = PeftConfig.from_pretrained(model_path)
tokenizer = AutoTokenizer.from_pretrained(peft_config.base_model_name_or_path)
model = AutoModelForCausalLM.from_pretrained(
    peft_config.base_model_name_or_path,
    device_map="auto",
    torch_dtype=torch.float16
)
model = PeftModel.from_pretrained(model, model_path)

# تحميل مجموعة بيانات الاختبار
dataset = load_from_disk(config["dataset_path"])
test_dataset = dataset["test"]

# تقييم النموذج على مجموعة الاختبار
results = []

for i, example in enumerate(tqdm(test_dataset, desc="تقييم النموذج")):
    if i >= 100:  # تقييم على 100 مثال فقط لتوفير الوقت
        break
    
    instruction = example["instruction"]
    expected_response = example["response"]
    category = example["category"]
    
    # إعداد المدخلات
    prompt = f"### تعليمات:\n{instruction}\n\n### استجابة:"
    inputs = tokenizer(prompt, return_tensors="pt").to(model.device)
    
    # توليد الاستجابة
    with torch.no_grad():
        outputs = model.generate(
            **inputs,
            max_new_tokens=512,
            temperature=0.7,
            top_p=0.9,
            do_sample=True
        )
    
    # فك ترميز الاستجابة
    generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    response = generated_text.split("### استجابة:")[1].strip()
    
    # حساب مقاييس التقييم البسيطة
    # هنا يمكن إضافة مقاييس أكثر تعقيدًا مثل BLEU أو ROUGE
    length_ratio = len(response) / max(1, len(expected_response))
    
    results.append({
        "category": category,
        "instruction": instruction,
        "expected_response": expected_response,
        "generated_response": response,
        "length_ratio": length_ratio
    })

# تحليل النتائج
df = pd.DataFrame(results)
avg_length_ratio = df["length_ratio"].mean()
category_stats = df.groupby("category")["length_ratio"].mean()

# حفظ نتائج التقييم
output_file = os.path.join(config["output_dir"], "evaluation_results.json")
with open(output_file, "w") as f:
    json.dump({
        "avg_length_ratio": avg_length_ratio,
        "category_stats": category_stats.to_dict(),
        "examples": results[:10]  # حفظ 10 أمثلة فقط للتوضيح
    }, f, indent=2, ensure_ascii=False)

print(f"تم حفظ نتائج التقييم في: {output_file}")
print(f"متوسط نسبة الطول: {avg_length_ratio}")
print("إحصائيات حسب الفئة:")
print(category_stats)

print("اكتمل تقييم النموذج بنجاح!")
EOL
    
    # تنفيذ سكربت التقييم
    echo -e "${YELLOW}[*] تقييم أداء النموذج...${NC}"
    export CONFIG_FILE=$CONFIG_FILE
    python3 $TRAINING_DIR/evaluate_model.py
    
    echo -e "${GREEN}[+] تم تقييم أداء النموذج بنجاح${NC}"
}

# دمج النموذج وتحسينه النهائي
merge_and_optimize() {
    echo -e "${BLUE}[*] دمج النموذج وتحسينه النهائي...${NC}"
    
    # إنشاء سكربت الدمج والتحسين
    cat > $TRAINING_DIR/merge_and_optimize.py << 'EOL'
import os
import json
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import PeftModel, PeftConfig

# تحديد المسارات
config_file = os.environ.get("CONFIG_FILE")
with open(config_file, "r") as f:
    config = json.load(f)

# تحميل النموذج المدرب
model_path = config["output_dir"]
print(f"تحميل النموذج المدرب من: {model_path}")

# تحميل التكوين والنموذج
peft_config = PeftConfig.from_pretrained(model_path)
tokenizer = AutoTokenizer.from_pretrained(peft_config.base_model_name_or_path)

# تحميل النموذج الأساسي
print("تحميل النموذج الأساسي...")
base_model = AutoModelForCausalLM.from_pretrained(
    peft_config.base_model_name_or_path,
    device_map="auto",
    torch_dtype=torch.float16
)

# تحميل النموذج المدرب
print("تحميل النموذج المدرب...")
model = PeftModel.from_pretrained(base_model, model_path)

# دمج الأوزان
print("دمج أوزان النموذج...")
merged_model = model.merge_and_unload()

# تحسين النموذج
print("تحسين النموذج...")
merged_model.config.pretraining_tp = 1

# حفظ النموذج المدمج
final_model_path = os.path.join(config["output_dir"], "merged")
print(f"حفظ النموذج المدمج في: {final_model_path}")
merged_model.save_pretrained(final_model_path, safe_serialization=True)
tokenizer.save_pretrained(final_model_path)

# حفظ تكوين النموذج النهائي
final_config = config.copy()
final_config["model_type"] = "merged"
final_config["merge_date"] = "2025-06-10"  # تحديث التاريخ حسب الحاجة

with open(os.path.join(final_model_path, "wolf_config.json"), "w") as f:
    json.dump(final_config, f, indent=2, ensure_ascii=False)

print("اكتمل دمج وتحسين النموذج بنجاح!")
EOL
    
    # تنفيذ سكربت الدمج والتحسين
    echo -e "${YELLOW}[*] دمج النموذج وتحسينه النهائي...${NC}"
    export CONFIG_FILE=$CONFIG_FILE
    python3 $TRAINING_DIR/merge_and_optimize.py
    
    echo -e "${GREEN}[+] تم دمج النموذج وتحسينه النهائي بنجاح${NC}"
}

# إنشاء واجهة API للنموذج
create_api() {
    echo -e "${BLUE}[*] إنشاء واجهة API للنموذج...${NC}"
    
    # إنشاء سكربت واجهة API
    cat > $TRAINING_DIR/wolf_api.py << 'EOL'
import os
import json
import torch
import uuid
import time
import base64
import hashlib
import hmac
from datetime import datetime, timedelta
from fastapi import FastAPI, HTTPException, Depends, Header, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from transformers import AutoModelForCausalLM, AutoTokenizer

# تحديد المسارات
config_file = os.environ.get("CONFIG_FILE")
with open(config_file, "r") as f:
    config = json.load(f)

# تحميل النموذج المدمج
model_path = os.path.join(config["output_dir"], "merged")
print(f"تحميل النموذج المدمج من: {model_path}")

# تحميل النموذج والمعالج اللغوي
tokenizer = AutoTokenizer.from_pretrained(model_path)
model = AutoModelForCausalLM.from_pretrained(
    model_path,
    device_map="auto",
    torch_dtype=torch.float16
)

# إنشاء تطبيق FastAPI
app = FastAPI(
    title="Wolf AI API",
    description="واجهة برمجة تطبيقات لنموذج الذكاء الاصطناعي Wolf AI",
    version="1.0.0"
)

# إضافة CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# نموذج البيانات للطلب
class CompletionRequest(BaseModel):
    prompt: str
    max_tokens: int = 512
    temperature: float = 0.7
    top_p: float = 0.9
    stream: bool = False
    include_mindmap: bool = False

# نموذج البيانات للاستجابة
class CompletionResponse(BaseModel):
    id: str
    object: str
    created: int
    model: str
    choices: List[Dict[str, Any]]
    usage: Dict[str, int]
    mindmap: Optional[Dict[str, Any]] = None

# قاموس لتخزين المفاتيح
API_KEYS = {}

# دالة لإنشاء مفتاح API
def generate_api_key(user_id: str, expiry_days: int = 365) -> str:
    # إنشاء مفتاح عشوائي
    random_key = uuid.uuid4().hex
    
    # إنشاء توقيع HMAC
    secret = os.environ.get("WOLF_API_SECRET", "wolf_ai_secret_key")
    signature = hmac.new(
        secret.encode(),
        msg=f"{user_id}:{random_key}".encode(),
        digestmod=hashlib.sha256
    ).hexdigest()
    
    # دمج المفتاح والتوقيع
    api_key = f"wolf_{random_key}{signature[:10]}"
    
    # تخزين معلومات المفتاح
    expiry_date = datetime.now() + timedelta(days=expiry_days)
    API_KEYS[api_key] = {
        "user_id": user_id,
        "created_at": datetime.now().isoformat(),
        "expires_at": expiry_date.isoformat()
    }
    
    # حفظ المفاتيح في ملف
    api_keys_file = os.path.join(os.environ.get("API_KEYS_DIR"), "api_keys.json")
    with open(api_keys_file, "w") as f:
        json.dump(API_KEYS, f, indent=2)
    
    return api_key

# دالة للتحقق من صحة مفتاح API
async def verify_api_key(api_key: str = Header(...)):
    if api_key not in API_KEYS:
        raise HTTPException(status_code=401, detail="مفتاح API غير صالح")
    
    # التحقق من تاريخ انتهاء الصلاحية
    expiry_date = datetime.fromisoformat(API_KEYS[api_key]["expires_at"])
    if datetime.now() > expiry_date:
        raise HTTPException(status_code=401, detail="مفتاح API منتهي الصلاحية")
    
    return api_key

# دالة لإنشاء خريطة ذهنية
def generate_mindmap(text: str) -> Dict[str, Any]:
    # هذه دالة بسيطة لإنشاء خريطة ذهنية من النص
    # في التطبيق الحقيقي، يمكن استخدام خوارزميات أكثر تعقيدًا
    
    lines = text.split("\n")
    nodes = []
    edges = []
    
    # البحث عن العنوان الرئيسي
    title = "Wolf AI Mindmap"
    for line in lines:
        if line.startswith("# "):
            title = line[2:].strip()
            break
    
    # إضافة العقدة الرئيسية
    nodes.append({
        "id": 0,
        "label": title,
        "depth": 0
    })
    
    # تحليل النص لاستخراج العقد والحواف
    current_id = 1
    for line in lines:
        if line.startswith("- "):
            content = line[2:].strip()
            nodes.append({
                "id": current_id,
                "label": content,
                "depth": 1
            })
            edges.append({
                "source": 0,
                "target": current_id
            })
            current_id += 1
        elif line.startswith("  - "):
            content = line[4:].strip()
            parent_id = max(1, current_id - 1)
            nodes.append({
                "id": current_id,
                "label": content,
                "depth": 2
            })
            edges.append({
                "source": parent_id,
                "target": current_id
            })
            current_id += 1
    
    return {
        "title": title,
        "nodes": nodes,
        "edges": edges
    }

# مسار لإنشاء مفتاح API
@app.post("/api/keys/generate")
async def create_api_key(user_id: str, days: int = 365):
    api_key = generate_api_key(user_id, days)
    return {"api_key": api_key}

# مسار للحصول على إكمال النص
@app.post("/api/completions", response_model=CompletionResponse)
async def create_completion(request: CompletionRequest, api_key: str = Depends(verify_api_key)):
    try:
        # إعداد المدخلات
        inputs = tokenizer(request.prompt, return_tensors="pt").to(model.device)
        
        # توليد النص
        start_time = time.time()
        with torch.no_grad():
            outputs = model.generate(
                **inputs,
                max_new_tokens=request.max_tokens,
                temperature=request.temperature,
                top_p=request.top_p,
                do_sample=True
            )
        
        # فك ترميز النص
        generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
        response_text = generated_text[len(request.prompt):].strip()
        

# دالة لإنشاء خريطة ذهنية
def generate_mindmap(text: str) -> Dict[str, Any]:
    # تحليل النص لاستخراج المفاهيم الرئيسية
    concepts = []
    for sentence in text.split(". "):
        if len(sentence) > 20:  # تجاهل الجمل القصيرة
            # استخراج الأسماء كمرشحين للمفاهيم
            words = [word for word in sentence.split() if len(word) > 3]
            if words:
                concepts.append(words[0])
    
    # إنشاء هيكل الخريطة الذهنية
    nodes = [{"id": 0, "label": "الفكرة الرئيسية", "depth": 0}]
    edges = []
    
    for i, concept in enumerate(concepts[:5]):  # الحد الأقصى 5 مفاهيم
        node_id = i + 1
        nodes.append({
            "id": node_id,
            "label": concept,
            "depth": 1
        })
        edges.append({
            "source": 0,
            "target": node_id
        })
    
    return {
        "title": "الخريطة الذهنية",
        "nodes": nodes,
        "edges": edges,
        "summary": "تم إنشاء خريطة ذهنية تلقائيًا بناءً على النص"
    }

# مسار لإنشاء مفتاح API
@app.post("/api/keys/generate")
async def create_api_key(user_id: str, days: int = 365):
    api_key = generate_api_key(user_id, days)
    return {"api_key": api_key}

# مسار للحصول على إكمال النص
@app.post("/api/completions", response_model=CompletionResponse)
async def create_completion(request: CompletionRequest, api_key: str = Depends(verify_api_key)):
    try:
        # إعداد المدخلات
        inputs = tokenizer(request.prompt, return_tensors="pt").to(model.device)
        
        # توليد النص
        start_time = time.time()
        with torch.no_grad():
            outputs = model.generate(
                **inputs,
                max_new_tokens=request.max_tokens,
                temperature=request.temperature,
                top_p=request.top_p,
                do_sample=True
            )
        
        # فك ترميز النص
        generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
        response_text = generated_text[len(request.prompt):].strip()
        
        # إنشاء خريطة ذهنية إذا طلب المستخدم ذلك
        mindmap = None
        if request.include_mindmap:
            mindmap = generate_mindmap(response_text)
        
        # حساب استخدام الرموز
        input_tokens = len(inputs.input_ids[0])
        output_tokens = len(outputs[0]) - input_tokens
        total_tokens = input_tokens + output_tokens
        
        # إنشاء الاستجابة
        response = CompletionResponse(
            id=f"cmpl-{uuid.uuid4().hex}",
            object="text_completion",
            created=int(time.time()),
            model=config["model_name"],
            choices=[{
                "text": response_text,
                "index": 0,
                "logprobs": None,
                "finish_reason": "length"
            }],
            usage={
                "prompt_tokens": input_tokens,
                "completion_tokens": output_tokens,
                "total_tokens": total_tokens
            },
            mindmap=mindmap
        )
        
        return response
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# مسار للتوليد المتدفق
@app.post("/api/completions/stream")
async def stream_completion(request: CompletionRequest, api_key: str = Depends(verify_api_key)):
    try:
        # إعداد المدخلات
        inputs = tokenizer(request.prompt, return_tensors="pt").to(model.device)
        
        # إنشاء مولد التدفق
        streamer = TextIteratorStreamer(tokenizer, skip_prompt=True)
        
        # بدء توليد النص في خلفية
        generation_kwargs = dict(
            **inputs,
            streamer=streamer,
            max_new_tokens=request.max_tokens,
            temperature=request.temperature,
            top_p=request.top_p,
            do_sample=True
        )
        thread = Thread(target=model.generate, kwargs=generation_kwargs)
        thread.start()
        
        # إنشاء دالة المولد للاستجابة المتدفقة
        async def response_generator():
            start_time = time.time()
            buffer = []
            
            for new_text in streamer:
                buffer.append(new_text)
                if len(buffer) > 3:  # إرسال كل 3 رموز
                    chunk = ''.join(buffer)
                    yield f"data: {json.dumps({'text': chunk})}\n\n"
                    buffer = []
            
            # إرسال أي محتوى متبقي
            if buffer:
                chunk = ''.join(buffer)
                yield f"data: {json.dumps({'text': chunk})}\n\n"
            
            # إرسال حدث الانتهاء
            elapsed = time.time() - start_time
            yield f"data: [DONE]\n\n"
        
        return StreamingResponse(response_generator(), media_type="text/event-stream")
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# مسار للحصول على معلومات النموذج
@app.get("/api/model/info")
async def get_model_info(api_key: str = Depends(verify_api_key)):
    return {
        "model_name": config["model_name"],
        "base_model": config["base_model"],
        "version": config.get("version", "1.0.0"),
        "parameters": f"{model.config.vocab_size}M",
        "description": "نموذج Wolf AI المتقدم للفهم والتوليد اللغوي"
    }

# تشغيل الخادم عند تنفيذ السكربت مباشرة
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
EOL
    
    # إنشاء سكربت تشغيل API
    cat > $TRAINING_DIR/run_wolf_api.sh << 'EOL'
#!/bin/bash
export TRAINING_DIR="$HOME/wolf_ai_training"
export CONFIG_FILE="$TRAINING_DIR/wolf_config.json"
export API_KEYS_DIR="$TRAINING_DIR/api_keys"
export WOLF_API_SECRET="your_secure_secret_here"  # يجب تغييره في الإنتاج

cd $TRAINING_DIR
python3 wolf_api.py
EOL
    
    # جعل سكربت التشغيل قابلاً للتنفيذ
    chmod +x $TRAINING_DIR/run_wolf_api.sh
    
    echo -e "${GREEN}[+] تم إنشاء واجهة API بنجاح${NC}"
    echo -e "${YELLOW}[!] لتنشيط الواجهة: ${TRAINING_DIR}/run_wolf_api.sh${NC}"
    echo -e "${YELLOW}[!] ستعمل الواجهة على: http://localhost:8000${NC}"
}

# ======================================================
# الدالة الرئيسية لتشغيل جميع الخطوات
# ======================================================
main() {
    echo -e "${GOLD}"
    echo "======================================================"
    echo "           🐺 بدء تشغيل سكربت Wolf AI"
    echo "======================================================"
    echo -e "${NC}"
    
    setup_directories
    install_dependencies
    download_datasets
    prepare_data
    create_mindmap_templates
    download_base_model
    finetune_model
    enhance_mindmap_capabilities
    evaluate_model
    merge_and_optimize
    create_api
    
    echo -e "${GOLD}"
    echo "======================================================"
    echo "       ✅ اكتمل تنفيذ سكربت Wolf AI بنجاح!"
    echo "======================================================"
    echo -e "${NC}"
}

# تشغيل الدالة الرئيسية
main
