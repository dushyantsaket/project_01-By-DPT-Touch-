from pathlib import Path
import re
root = Path('.').resolve()
patterns = [
    (re.compile(r'import \{ useAuth \} from "\.\./context/AuthContext"'), 'import { useAuth } from "../context/useAuth"'),
    (re.compile(r"import \{ useAuth \} from '\.\./context/AuthContext'"), "import { useAuth } from '../context/useAuth'"),
    (re.compile(r'import \{ useAuth \} from "\.\/context/AuthContext"'), 'import { useAuth } from "./context/useAuth"'),
    (re.compile(r"import \{ useAuth \} from '\.\/context/AuthContext'"), "import { useAuth } from './context/useAuth'")
]
for path in root.rglob('*.jsx'):
    if 'node_modules' in path.parts:
        continue
    text = path.read_text(encoding='utf-8')
    new_text = text
    for pat, repl in patterns:
        new_text = pat.sub(repl, new_text)
    if new_text != text:
        path.write_text(new_text, encoding='utf-8')
        print('updated', path)
