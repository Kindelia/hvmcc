
// Generated by peggy v. 2.0.1 (ts-pegjs plugin v. 2.1.0 )
//
// https://peggyjs.org/   https://github.com/metadevpro/ts-pegjs

"use strict";

export interface IFilePosition {
  offset: number;
  line: number;
  column: number;
}

export interface IFileRange {
  start: IFilePosition;
  end: IFilePosition;
  source: string;
}

export interface ILiteralExpectation {
  type: "literal";
  text: string;
  ignoreCase: boolean;
}

export interface IClassParts extends Array<string | IClassParts> {}

export interface IClassExpectation {
  type: "class";
  parts: IClassParts;
  inverted: boolean;
  ignoreCase: boolean;
}

export interface IAnyExpectation {
  type: "any";
}

export interface IEndExpectation {
  type: "end";
}

export interface IOtherExpectation {
  type: "other";
  description: string;
}

export type Expectation = ILiteralExpectation | IClassExpectation | IAnyExpectation | IEndExpectation | IOtherExpectation;

function peg$padEnd(str: string, targetLength: number, padString: string) {
  padString = padString || ' ';
  if (str.length > targetLength) {
    return str;
  }
  targetLength -= str.length;
  padString += padString.repeat(targetLength);
  return str + padString.slice(0, targetLength);
}

export class SyntaxError extends Error {
  public static buildMessage(expected: Expectation[], found: string | null) {
    function hex(ch: string): string {
      return ch.charCodeAt(0).toString(16).toUpperCase();
    }

    function literalEscape(s: string): string {
      return s
        .replace(/\\/g, "\\\\")
        .replace(/"/g,  "\\\"")
        .replace(/\0/g, "\\0")
        .replace(/\t/g, "\\t")
        .replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r")
        .replace(/[\x00-\x0F]/g,            (ch) => "\\x0" + hex(ch) )
        .replace(/[\x10-\x1F\x7F-\x9F]/g, (ch) => "\\x"  + hex(ch) );
    }

    function classEscape(s: string): string {
      return s
        .replace(/\\/g, "\\\\")
        .replace(/\]/g, "\\]")
        .replace(/\^/g, "\\^")
        .replace(/-/g,  "\\-")
        .replace(/\0/g, "\\0")
        .replace(/\t/g, "\\t")
        .replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r")
        .replace(/[\x00-\x0F]/g,            (ch) => "\\x0" + hex(ch) )
        .replace(/[\x10-\x1F\x7F-\x9F]/g, (ch) => "\\x"  + hex(ch) );
    }

    function describeExpectation(expectation: Expectation) {
      switch (expectation.type) {
        case "literal":
          return "\"" + literalEscape(expectation.text) + "\"";
        case "class":
          const escapedParts = expectation.parts.map((part) => {
            return Array.isArray(part)
              ? classEscape(part[0] as string) + "-" + classEscape(part[1] as string)
              : classEscape(part);
          });

          return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
        case "any":
          return "any character";
        case "end":
          return "end of input";
        case "other":
          return expectation.description;
      }
    }

    function describeExpected(expected1: Expectation[]) {
      const descriptions = expected1.map(describeExpectation);
      let i: number;
      let j: number;

      descriptions.sort();

      if (descriptions.length > 0) {
        for (i = 1, j = 1; i < descriptions.length; i++) {
          if (descriptions[i - 1] !== descriptions[i]) {
            descriptions[j] = descriptions[i];
            j++;
          }
        }
        descriptions.length = j;
      }

      switch (descriptions.length) {
        case 1:
          return descriptions[0];

        case 2:
          return descriptions[0] + " or " + descriptions[1];

        default:
          return descriptions.slice(0, -1).join(", ")
            + ", or "
            + descriptions[descriptions.length - 1];
      }
    }

    function describeFound(found1: string | null) {
      return found1 ? "\"" + literalEscape(found1) + "\"" : "end of input";
    }

    return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
  }

  public message: string;
  public expected: Expectation[];
  public found: string | null;
  public location: IFileRange;
  public name: string;

  constructor(message: string, expected: Expectation[], found: string | null, location: IFileRange) {
    super();
    this.message = message;
    this.expected = expected;
    this.found = found;
    this.location = location;
    this.name = "SyntaxError";

    if (typeof (Object as any).setPrototypeOf === "function") {
      (Object as any).setPrototypeOf(this, SyntaxError.prototype);
    } else {
      (this as any).__proto__ = SyntaxError.prototype;
    }
    if (typeof (Error as any).captureStackTrace === "function") {
      (Error as any).captureStackTrace(this, SyntaxError);
    }
  }

  format(sources: { source: string; text: string }[]): string {
    let str = 'Error: ' + this.message;
    if (this.location) {
      let src: string[] | null = null;
      let k;
      for (k = 0; k < sources.length; k++) {
        if (sources[k].source === this.location.source) {
          src = sources[k].text.split(/\r\n|\n|\r/g);
          break;
        }
      }
      let s = this.location.start;
      let loc = this.location.source + ':' + s.line + ':' + s.column;
      if (src) {
        let e = this.location.end;
        let filler = peg$padEnd('', s.line.toString().length, ' ');
        let line = src[s.line - 1];
        let last = s.line === e.line ? e.column : line.length + 1;
        str += '\n --> ' + loc + '\n' + filler + ' |\n' + s.line + ' | ' + line + '\n' + filler + ' | ' +
          peg$padEnd('', s.column - 1, ' ') +
          peg$padEnd('', last - s.column, '^');
      } else {
        str += '\n at ' + loc;
      }
    }
    return str;
  }
}

function peg$parse(input: string, options?: IParseOptions) {
  options = options !== undefined ? options : {};

  const peg$FAILED: Readonly<any> = {};
  const peg$source = options.grammarSource;

  const peg$startRuleFunctions: {[id: string]: any} = { Body: peg$parseBody };
  let peg$startRuleFunction: () => any = peg$parseBody;

  const peg$c0 = ";";
  const peg$c1 = peg$literalExpectation(";", false);
  const peg$c2 = function(l: any): any { return l.map((x: any) => x[0]) };
  const peg$c3 = "{";
  const peg$c4 = peg$literalExpectation("{", false);
  const peg$c5 = "}";
  const peg$c6 = peg$literalExpectation("}", false);
  const peg$c7 = "+";
  const peg$c8 = peg$literalExpectation("+", false);
  const peg$c9 = function(a: any, b: any): any { return ["+", a, b] };
  const peg$c10 = "=";
  const peg$c11 = peg$literalExpectation("=", false);
  const peg$c12 = function(v: any, e: any): any { return ["assign", v, e] };
  const peg$c13 = "if";
  const peg$c14 = peg$literalExpectation("if", false);
  const peg$c15 = "(";
  const peg$c16 = peg$literalExpectation("(", false);
  const peg$c17 = ")";
  const peg$c18 = peg$literalExpectation(")", false);
  const peg$c19 = "else";
  const peg$c20 = peg$literalExpectation("else", false);
  const peg$c21 = function(e: any, b1: any, b2: any): any { return ["if", e, b1, b2] };
  const peg$c22 = /^[0-9]/;
  const peg$c23 = peg$classExpectation([["0", "9"]], false, false);
  const peg$c24 = function(n: any): any { return parseInt(n.join("")) };
  const peg$c25 = /^[a-z]/;
  const peg$c26 = peg$classExpectation([["a", "z"]], false, false);
  const peg$c27 = function(v: any): any { return v.join("") };

  let peg$currPos = 0;
  let peg$savedPos = 0;
  const peg$posDetailsCache = [{ line: 1, column: 1 }];
  let peg$maxFailPos = 0;
  let peg$maxFailExpected: Expectation[] = [];
  let peg$silentFails = 0;

  let peg$result;

  if (options.startRule !== undefined) {
    if (!(options.startRule in peg$startRuleFunctions)) {
      throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
    }

    peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
  }

  function text(): string {
    return input.substring(peg$savedPos, peg$currPos);
  }

  function location(): IFileRange {
    return peg$computeLocation(peg$savedPos, peg$currPos);
  }

  function expected(description: string, location1?: IFileRange) {
    location1 = location1 !== undefined
      ? location1
      : peg$computeLocation(peg$savedPos, peg$currPos);

    throw peg$buildStructuredError(
      [peg$otherExpectation(description)],
      input.substring(peg$savedPos, peg$currPos),
      location1
    );
  }

  function error(message: string, location1?: IFileRange) {
    location1 = location1 !== undefined
      ? location1
      : peg$computeLocation(peg$savedPos, peg$currPos);

    throw peg$buildSimpleError(message, location1);
  }

  function peg$literalExpectation(text1: string, ignoreCase: boolean): ILiteralExpectation {
    return { type: "literal", text: text1, ignoreCase: ignoreCase };
  }

  function peg$classExpectation(parts: IClassParts, inverted: boolean, ignoreCase: boolean): IClassExpectation {
    return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
  }

  function peg$anyExpectation(): IAnyExpectation {
    return { type: "any" };
  }

  function peg$endExpectation(): IEndExpectation {
    return { type: "end" };
  }

  function peg$otherExpectation(description: string): IOtherExpectation {
    return { type: "other", description: description };
  }

  function peg$computePosDetails(pos: number) {
    let details = peg$posDetailsCache[pos];
    let p;

    if (details) {
      return details;
    } else {
      p = pos - 1;
      while (!peg$posDetailsCache[p]) {
        p--;
      }

      details = peg$posDetailsCache[p];
      details = {
        line: details.line,
        column: details.column
      };

      while (p < pos) {
        if (input.charCodeAt(p) === 10) {
          details.line++;
          details.column = 1;
        } else {
          details.column++;
        }

        p++;
      }

      peg$posDetailsCache[pos] = details;

      return details;
    }
  }

  function peg$computeLocation(startPos: number, endPos: number): IFileRange {
    const startPosDetails = peg$computePosDetails(startPos);
    const endPosDetails = peg$computePosDetails(endPos);

    return {
      source: peg$source,
      start: {
        offset: startPos,
        line: startPosDetails.line,
        column: startPosDetails.column
      },
      end: {
        offset: endPos,
        line: endPosDetails.line,
        column: endPosDetails.column
      }
    };
  }

  function peg$fail(expected1: Expectation) {
    if (peg$currPos < peg$maxFailPos) { return; }

    if (peg$currPos > peg$maxFailPos) {
      peg$maxFailPos = peg$currPos;
      peg$maxFailExpected = [];
    }

    peg$maxFailExpected.push(expected1);
  }

  function peg$buildSimpleError(message: string, location1: IFileRange) {
    return new SyntaxError(message, [], "", location1);
  }

  function peg$buildStructuredError(expected1: Expectation[], found: string | null, location1: IFileRange) {
    return new SyntaxError(
      SyntaxError.buildMessage(expected1, found),
      expected1,
      found,
      location1
    );
  }

  function peg$parseBody(): any {
    let s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = [];
    s2 = peg$currPos;
    s3 = peg$parseStmt();
    if (s3 as any !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 59) {
        s4 = peg$c0;
        peg$currPos++;
      } else {
        s4 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c1); }
      }
      if (s4 as any !== peg$FAILED) {
        s3 = [s3, s4];
        s2 = s3;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
    } else {
      peg$currPos = s2;
      s2 = peg$FAILED;
    }
    while (s2 as any !== peg$FAILED) {
      s1.push(s2);
      s2 = peg$currPos;
      s3 = peg$parseStmt();
      if (s3 as any !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 59) {
          s4 = peg$c0;
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c1); }
        }
        if (s4 as any !== peg$FAILED) {
          s3 = [s3, s4];
          s2 = s3;
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
    }
    if (s1 as any !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c2(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseBlock(): any {
    let s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 123) {
      s1 = peg$c3;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c4); }
    }
    if (s1 as any !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = peg$parseStmt();
      if (s4 as any !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 59) {
          s5 = peg$c0;
          peg$currPos++;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c1); }
        }
        if (s5 as any !== peg$FAILED) {
          s4 = [s4, s5];
          s3 = s4;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      while (s3 as any !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = peg$parseStmt();
        if (s4 as any !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 59) {
            s5 = peg$c0;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c1); }
          }
          if (s5 as any !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      if (s2 as any !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 125) {
          s3 = peg$c5;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c6); }
        }
        if (s3 as any !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c2(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseStmt(): any {
    let s0;

    s0 = peg$parseAssign();
    if (s0 as any === peg$FAILED) {
      s0 = peg$parseIf();
    }

    return s0;
  }

  function peg$parseExpr(): any {
    let s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parseAtomicExpr();
    if (s1 as any !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 43) {
        s2 = peg$c7;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c8); }
      }
      if (s2 as any !== peg$FAILED) {
        s3 = peg$parseAtomicExpr();
        if (s3 as any !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c9(s1, s3);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    if (s0 as any === peg$FAILED) {
      s0 = peg$parseAtomicExpr();
    }

    return s0;
  }

  function peg$parseAtomicExpr(): any {
    let s0;

    s0 = peg$parseNum();
    if (s0 as any === peg$FAILED) {
      s0 = peg$parseVar();
    }

    return s0;
  }

  function peg$parseAssign(): any {
    let s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parseVar();
    if (s1 as any !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 61) {
        s2 = peg$c10;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c11); }
      }
      if (s2 as any !== peg$FAILED) {
        s3 = peg$parseExpr();
        if (s3 as any !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c12(s1, s3);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseIf(): any {
    let s0, s1, s2, s3, s4, s5, s6, s7;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 2) === peg$c13) {
      s1 = peg$c13;
      peg$currPos += 2;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c14); }
    }
    if (s1 as any !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 40) {
        s2 = peg$c15;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c16); }
      }
      if (s2 as any !== peg$FAILED) {
        s3 = peg$parseExpr();
        if (s3 as any !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 41) {
            s4 = peg$c17;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c18); }
          }
          if (s4 as any !== peg$FAILED) {
            s5 = peg$parseBlock();
            if (s5 as any !== peg$FAILED) {
              if (input.substr(peg$currPos, 4) === peg$c19) {
                s6 = peg$c19;
                peg$currPos += 4;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c20); }
              }
              if (s6 as any !== peg$FAILED) {
                s7 = peg$parseBlock();
                if (s7 as any !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c21(s3, s5, s7);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseNum(): any {
    let s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    if (peg$c22.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c23); }
    }
    if (s2 as any !== peg$FAILED) {
      while (s2 as any !== peg$FAILED) {
        s1.push(s2);
        if (peg$c22.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c23); }
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 as any !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c24(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseVar(): any {
    let s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    if (peg$c25.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c26); }
    }
    if (s2 as any !== peg$FAILED) {
      while (s2 as any !== peg$FAILED) {
        s1.push(s2);
        if (peg$c25.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c26); }
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 as any !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c27(s1);
    }
    s0 = s1;

    return s0;
  }

  peg$result = peg$startRuleFunction();

  if (peg$result !== peg$FAILED && peg$currPos === input.length) {
    return peg$result;
  } else {
    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
      peg$fail(peg$endExpectation());
    }

    throw peg$buildStructuredError(
      peg$maxFailExpected,
      peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
      peg$maxFailPos < input.length
        ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
        : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
    );
  }
}

export interface IParseOptions {
  filename?: string;
  startRule?: string;
  tracer?: any;
  [key: string]: any;
}
export type ParseFunction = (input: string, options?: IParseOptions) => any;
export const parse: ParseFunction = peg$parse;

