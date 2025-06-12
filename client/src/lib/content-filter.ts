// Content filtering for objectionable content
const PROFANITY_WORDS = [
  // English
  'fuck', 'shit', 'damn', 'bitch', 'asshole', 'bastard', 'crap', 'piss', 'hell',
  'stupid', 'idiot', 'moron', 'retard', 'gay', 'fag', 'nigger', 'whore', 'slut',
  'kill yourself', 'kys', 'suicide', 'die', 'death threats',
  // Chinese
  '操', '妈的', '傻逼', '白痴', '智障', '死', '去死', '自杀', '杀死',
  '草泥马', '卧槽', '他妈的', '混蛋', '王八蛋', '贱人', '婊子'
];

const SPAM_PATTERNS = [
  /(.)\1{4,}/g, // Repeated characters (aaaaa)
  /^.{0,3}$/g, // Very short posts
  /(http|www\.|\.com|\.net|\.org)/gi, // URLs
  /\b\d{10,}\b/g, // Long numbers (phone numbers)
  /buy now|click here|free money|earn \$|make money/gi,
];

const HARASSMENT_PATTERNS = [
  /you (should|need to|must) (die|kill yourself|stop living)/gi,
  /(i will|gonna|going to) (kill|hurt|find) you/gi,
  /shut up|stfu|gtfo/gi,
  /(ugly|fat|worthless|pathetic) (bitch|whore|slut)/gi,
];

export interface ContentFilterResult {
  isClean: boolean;
  violations: string[];
  filteredContent?: string;
}

export function filterContent(content: string): ContentFilterResult {
  const violations: string[] = [];
  let filteredContent = content;

  // Check for profanity
  const lowerContent = content.toLowerCase();
  const foundProfanity = PROFANITY_WORDS.filter(word => 
    lowerContent.includes(word.toLowerCase())
  );
  
  if (foundProfanity.length > 0) {
    violations.push('profanity');
    // Replace profanity with asterisks
    foundProfanity.forEach(word => {
      const regex = new RegExp(word, 'gi');
      filteredContent = filteredContent.replace(regex, '*'.repeat(word.length));
    });
  }

  // Check for spam patterns
  const hasSpam = SPAM_PATTERNS.some(pattern => pattern.test(content));
  if (hasSpam) {
    violations.push('spam');
  }

  // Check for harassment
  const hasHarassment = HARASSMENT_PATTERNS.some(pattern => pattern.test(content));
  if (hasHarassment) {
    violations.push('harassment');
  }

  // Check for excessive caps (shouting)
  const capsRatio = (content.match(/[A-Z]/g) || []).length / content.length;
  if (capsRatio > 0.7 && content.length > 10) {
    violations.push('excessive_caps');
    filteredContent = content.toLowerCase();
  }

  return {
    isClean: violations.length === 0,
    violations,
    filteredContent: violations.length > 0 ? filteredContent : content
  };
}

export function checkForSelfHarm(content: string): boolean {
  const selfHarmPatterns = [
    /want to (die|kill myself|end it all)/gi,
    /thinking about (suicide|killing myself)/gi,
    /can't take it anymore/gi,
    /nobody would miss me/gi,
    /better off dead/gi,
    /想死|想自杀|活不下去|没人会想念我/gi, // Chinese patterns
  ];

  return selfHarmPatterns.some(pattern => pattern.test(content));
}

export function getContentWarning(language: 'en' | 'zh', violations: string[]): string {
  if (language === 'zh') {
    const messages = {
      profanity: '包含不当语言',
      spam: '疑似垃圾信息',
      harassment: '包含骚扰内容',
      excessive_caps: '过度使用大写字母'
    };
    return violations.map(v => messages[v as keyof typeof messages]).join('，');
  } else {
    const messages = {
      profanity: 'Contains inappropriate language',
      spam: 'Detected as spam',
      harassment: 'Contains harassment',
      excessive_caps: 'Excessive use of capital letters'
    };
    return violations.map(v => messages[v as keyof typeof messages]).join(', ');
  }
}