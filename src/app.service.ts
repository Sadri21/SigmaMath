import { Injectable } from '@nestjs/common';

export interface AnswerOption {
    text: string;
    rationale: string;
    isCorrect: boolean;
}

export interface Question {
    questionNumber?: number;
    question: string;
    answerOptions: AnswerOption[];
}

@Injectable()
export class AppService {
    private templates = [
        {
            type: 'persegi_keliling',
            generate: () => {
                const s = Math.floor(Math.random() * 20) + 5; // 5-25
                const ans = 4 * s;
                return {
                    question: `Seorang pengrajin ingin membuat bingkai foto berbentuk persegi. Sisinya $${s}$ cm. Berapa total kayu untuk kelilingnya?`,
                    correct: `${ans} cm`,
                    rationale: `Betul! Keliling persegi = $4 \\times ${s}$ = ${ans} cm.`,
                    hint: `Ingat, Keliling persegi = $4 \\times sisi$.`,
                    distractors: [`${s * s} cm`, `${s * 2} cm`, `${ans + 10} cm`]
                };
            }
        },
        {
            type: 'persegi_luas_sisi',
            generate: () => {
                const s = (Math.floor(Math.random() * 9) + 2) * 10; // 20, 30... 100
                const keliling = 4 * s;
                return {
                    question: `Ubin persegi kelilingnya $${keliling}$ cm. Berapa panjang satu sisinya?`,
                    correct: `${s} cm`,
                    rationale: `Betul! $${keliling}$ dibagi $4$ = $${s}$.`,
                    hint: `Untuk mencari sisi, bagi Keliling dengan 4 ($K \\div 4$).`,
                    distractors: [`${keliling * 4} cm`, `${s / 2} cm`, `${keliling - s} cm`]
                };
            }
        },
        {
            type: 'persegipanjang_keliling',
            generate: () => {
                const p = Math.floor(Math.random() * 15) + 10;
                const l = Math.floor(Math.random() * 8) + 2;
                const ans = 2 * (p + l);
                return {
                    question: `Lapangan bulu tangkis panjangnya $${p}$ m dan lebar $${l}$ m. Berapa panjang garis kelilingnya?`,
                    correct: `${ans} meter`,
                    rationale: `Hebat! $(${p} + ${l}) \\times 2 = ${ans}$ meter.`,
                    hint: `Rumus Keliling = $2 \\times (panjang + lebar)$.`,
                    distractors: [`${p * l} meter`, `${p + l} meter`, `${ans * 2} meter`]
                };
            }
        },
        {
            type: 'persegipanjang_luas_sisi',
            generate: () => {
                const l = (Math.floor(Math.random() * 5) + 2) * 10; // 20, 30, 40, 50, 60
                const factor = Math.floor(Math.random() * 5) + 2; // 2-6
                const p = Math.floor((l * factor) / 10) * 10; // e.g., 20 * 4 = 80
                const luas = p * l;
                return {
                    question: `Meja persegi panjang luasnya $${luas.toLocaleString('id-ID')}$ cm², lebarnya $${l}$ cm. Berapa panjangnya?`,
                    correct: `${p} cm`,
                    rationale: `Cerdas! $${luas}$ dibagi $${l}$ = $${p}$.`,
                    hint: `Cari panjang dengan membagi Luas dengan lebar ($L \\div l$).`,
                    distractors: [`${luas * l} cm`, `${p + 20} cm`, `${l * 2} cm`]
                };
            }
        },
        {
            type: 'segitiga_luas',
            generate: () => {
                const a = (Math.floor(Math.random() * 10) + 4) * 2; // Even number 8-28
                const t = Math.floor(Math.random() * 10) + 5;
                const ans = (a * t) / 2;
                return {
                    question: `Ibu memotong sandwich jadi segitiga. Alasnya $${a}$ cm, tinggi $${t}$ cm. Berapa luasnya?`,
                    correct: `${ans} cm²`,
                    rationale: `Benar! $\\frac{1}{2} \\times ${a} \\times ${t} = ${ans}$.`,
                    hint: `Rumus Luas Segitiga = $\\frac{1}{2} \\times alas \\times tinggi$.`,
                    distractors: [`${a * t} cm²`, `${ans * 2} cm²`, `${ans + a} cm²`]
                };
            }
        },
        {
            type: 'segitiga_keliling_samasisi',
            generate: () => {
                const s = Math.floor(Math.random() * 15) + 5;
                const ans = s * 3;
                return {
                    question: `Taman segitiga sama sisi, panjang sisinya $${s}$ m. Berapa kelilingnya?`,
                    correct: `${ans} meter`,
                    rationale: `Benar! $${s} + ${s} + ${s} = ${ans}$.`,
                    hint: `Karena sama sisi, cukup jumlahkan ketiganya: $s + s + s$ (atau $3 \\times s$).`,
                    distractors: [`${s * s} meter`, `${s * 2} meter`, `${ans + 10} meter`]
                };
            }
        },
        {
            type: 'trapesium_luas',
            generate: () => {
                const a = Math.floor(Math.random() * 5) + 4; // 4-8
                const b = a + Math.floor(Math.random() * 6) + 2; // a + 2-7
                const t = (Math.floor(Math.random() * 4) + 2) * 2; // even 4-10
                const ans = 0.5 * (a + b) * t;
                return {
                    question: `Atap rumah berbentuk trapesium. Sisi atas $${a}$ m, bawah $${b}$ m, tinggi $${t}$ m. Berapa luasnya?`,
                    correct: `${ans} m²`,
                    rationale: `Pintar! $\\frac{1}{2} \\times (${a}+${b}) \\times ${t} = ${ans}$.`,
                    hint: `Rumus Luas = $\\frac{1}{2} \\times (atas + bawah) \\times tinggi$.`,
                    distractors: [`${ans * 2} m²`, `${(a + b) * t} m²`, `${ans + 10} m²`]
                };
            }
        },
        {
            type: 'trapesium_tinggi',
            generate: () => {
                const t = Math.floor(Math.random() * 5) + 2; // 2-6
                const a = Math.floor(Math.random() * 5) + 2;
                const b = a + Math.floor(Math.random() * 5) + 1;
                const luas = 0.5 * (a + b) * t;
                return {
                    question: `Papan trapesium sisi sejajarnya $${a}$ m dan $${b}$ m. Luasnya $${luas}$ m². Berapa tingginya?`,
                    correct: `${t} meter`,
                    rationale: `Luar biasa! Tingginya ${t} meter.`,
                    hint: `Gunakan rumus: Tinggi = $(2 \\times Luas) \\div (jumlah sisi sejajar)$.`,
                    distractors: [`${t * 2} meter`, `${t + 2} meter`, `${a + b} meter`]
                };
            }
        },
        {
            type: 'jargen_luas',
            generate: () => {
                const a = Math.floor(Math.random() * 10) + 5;
                const t = Math.floor(Math.random() * 8) + 3;
                const ans = a * t;
                return {
                    question: `Penghapus jajar genjang alasnya $${a}$ cm dan tinggi $${t}$ cm. Berapa luasnya?`,
                    correct: `${ans} cm²`,
                    rationale: `Tepat! $${a} \\times ${t} = ${ans}$.`,
                    hint: `Rumus Luas Jajar Genjang = $alas \\times tinggi$.`,
                    distractors: [`${ans / 2} cm²`, `${a + t} cm²`, `${ans * 2} cm²`]
                };
            }
        },
        {
            type: 'jargen_keliling',
            generate: () => {
                const a = Math.floor(Math.random() * 10) + 5;
                const m = Math.floor(Math.random() * 8) + 3;
                const ans = 2 * (a + m);
                return {
                    question: `Penghapus tadi alasnya $${a}$ cm, sisi miring $${m}$ cm. Berapa kelilingnya?`,
                    correct: `${ans} cm`,
                    rationale: `Yey! $2 \\times (${a} + ${m}) = ${ans}$.`,
                    hint: `Rumus Keliling = $2 \\times (alas + sisi miring)$.`,
                    distractors: [`${a + m} cm`, `${a * m} cm`, `${ans / 2} cm`]
                };
            }
        }
    ];

    getQuestions(total: number = 10): Question[] {
        const questions: Question[] = [];
        const pool = [...this.templates];

        // Ensure we handle case where request is larger than pool diversity, 
        // but here we generate infinite questions from templates

        for (let i = 0; i < total; i++) {
            const template = this.templates[Math.floor(Math.random() * this.templates.length)];
            const data = template.generate();

            // Construct options
            const options: AnswerOption[] = [
                { text: data.correct, rationale: data.rationale, isCorrect: true }
            ];

            data.distractors.forEach(d => {
                if (d !== data.correct) {
                    options.push({
                        text: d,
                        rationale: `Kurang tepat. ${data.hint}`,
                        isCorrect: false
                    });
                }
            });

            // Shuffle options
            this.shuffleArray(options);

            questions.push({
                questionNumber: i + 1,
                question: data.question,
                answerOptions: options
            });
        }
        return questions;
    }

    private shuffleArray(array: any[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}
